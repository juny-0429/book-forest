import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop'; // react-easy-crop 라이브러리로 이미지를 크롭할 수 있는 컴포넌트
import Slider from '@material-ui/core/Slider'; // 이미지 확대/축소 슬라이더
import Button from '@material-ui/core/Button'; // 자르기 완료 버튼
import Typography from '@material-ui/core/Typography'; // 텍스트 컴포넌트
import { withStyles } from '@material-ui/core/styles'; // 스타일을 커스터마이즈하는 라이브러리
import { getOrientation } from 'get-orientation/browser'; // 이미지의 EXIF 데이터를 사용하여 회전 방향을 감지하는 라이브러리
import ImgDialog from './ImgDialog'; // 잘린 이미지를 미리보기로 보여줄 다이얼로그
import { getCroppedImg, getRotatedImage } from './canvasUtils'; // 크롭된 이미지와 회전된 이미지를 처리하는 유틸리티 함수들
import { styles } from './styles'; // 스타일 설정

// 회전된 이미지를 위한 방향 매핑 (EXIF의 orientation 값에 대응)
const ORIENTATION_TO_ANGLE = {
  '3': 180, // 180도 회전
  '6': 90,  // 90도 회전
  '8': -90, // -90도 회전
};

// 메인 컴포넌트
const Demo = ({ classes }) => {
  // 상태 변수들
  const [imageSrc, setImageSrc] = React.useState(null); // 이미지 소스
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 이미지 크롭 위치 (x, y 좌표)
  const [rotation, setRotation] = useState(0); // 회전 각도 (0도)
  const [zoom, setZoom] = useState(1); // 확대/축소 비율 (1배 크기)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // 크롭된 이미지 영역의 픽셀 값
  const [croppedImage, setCroppedImage] = useState(null); // 잘린 이미지 저장

  // 크롭이 완료된 후 호출되는 함수
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // 크롭 영역이 업데이트되면 croppedAreaPixels로 크롭된 영역의 정보 업데이트
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // 잘린 이미지를 보여주는 함수
  const showCroppedImage = async () => {
    try {
      // getCroppedImg 유틸리티 함수 사용, 크롭된 이미지를 얻는다.
      const croppedImage = await getCroppedImg(
        imageSrc, // 원본 이미지 URL
        croppedAreaPixels, // 크롭된 영역
        rotation // 회전된 이미지에 대해 크롭
      );
      console.log('donee', { croppedImage }); // 자른 이미지 콘솔에 출력
      setCroppedImage(croppedImage); // 자른 이미지를 상태에 저장하여 미리보기로 사용
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력
    }
  };

  // 자른 이미지 미리보기를 닫는 함수
  const onClose = () => {
    setCroppedImage(null); // 잘린 이미지를 초기화하여 미리보기 창을 닫는다.
  };

  // 파일 선택 후 이미지 처리
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // 업로드된 파일
      let imageDataUrl = await readFile(file); // 파일을 데이터 URL로 읽는다.

      try {
        // EXIF 데이터를 통해 이미지 회전 정보 확인
        const orientation = await getOrientation(file); // 파일의 EXIF orientation 값을 얻음
        const rotation = ORIENTATION_TO_ANGLE[orientation]; // orientation 값에 맞는 회전 각도 매핑
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation); // 회전된 이미지를 처리
        }
      } catch (e) {
        console.warn('failed to detect the orientation'); // 회전 정보를 찾지 못하면 경고 출력
      }

      setImageSrc(imageDataUrl); // 최종 이미지 소스를 상태에 저장
    }
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          {/* 이미지 크롭 UI */}
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc} // 크롭할 이미지
              crop={crop} // 현재 크롭 위치
              rotation={rotation} // 회전 각도
              zoom={zoom} // 확대/축소 비율
              aspect={4 / 3} // 크롭 비율 설정 (여기서는 4:3 비율)
              onCropChange={setCrop} // 크롭 위치 변경 시 호출
              onRotationChange={setRotation} // 회전 각도 변경 시 호출
              onCropComplete={onCropComplete} // 크롭 완료 시 호출
              onZoomChange={setZoom} // 확대/축소 변경 시 호출
            />
          </div>
          {/* 크롭과 회전을 위한 슬라이더들 */}
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
                Zoom
              </Typography>
              <Slider
                value={zoom} // 현재 확대/축소 값
                min={1} // 최소값
                max={3} // 최대값
                step={0.1} // 증감폭
                aria-labelledby="Zoom"
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)} // 슬라이더 값 변경 시 호출
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
                Rotation
              </Typography>
              <Slider
                value={rotation} // 현재 회전 값
                min={0} // 최소값
                max={360} // 최대값
                step={1} // 증감폭
                aria-labelledby="Rotation"
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)} // 회전 슬라이더 값 변경 시 호출
              />
            </div>
            <Button
              onClick={showCroppedImage} // 자르기 완료 후 버튼 클릭 시 호출
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>

          {/* 잘린 이미지를 미리보기로 보여주는 ImgDialog */}
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" /> // 이미지 파일 선택
      )}
    </div>
  );
};

// 파일을 Data URL로 읽어오는 함수
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false); // 파일 읽기 완료 시 호출
    reader.readAsDataURL(file); // 파일을 Data URL 형식으로 읽음
  });
}

// 스타일을 적용하는 고차 컴포넌트
const StyledDemo = withStyles(styles)(Demo);

// root element에 컴포넌트 렌더링
const rootElement = document.getElementById('root');
ReactDOM.render(<StyledDemo />, rootElement);