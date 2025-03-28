export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      author: {
        Row: {
          author_awards: string;
          author_bio: string;
          author_birth_place: string | null;
          author_birth_year: number | null;
          author_id: number;
          author_name: string;
          author_profile_image_url: string | null;
          created_date: string;
        };
        Insert: {
          author_awards: string;
          author_bio: string;
          author_birth_place?: string | null;
          author_birth_year?: number | null;
          author_id?: number;
          author_name: string;
          author_profile_image_url?: string | null;
          created_date?: string;
        };
        Update: {
          author_awards?: string;
          author_bio?: string;
          author_birth_place?: string | null;
          author_birth_year?: number | null;
          author_id?: number;
          author_name?: string;
          author_profile_image_url?: string | null;
          created_date?: string;
        };
        Relationships: [];
      };
      authority: {
        Row: {
          auth_code: string | null;
          auth_description: string | null;
          auth_id: number;
          auth_name: string | null;
        };
        Insert: {
          auth_code?: string | null;
          auth_description?: string | null;
          auth_id?: number;
          auth_name?: string | null;
        };
        Update: {
          auth_code?: string | null;
          auth_description?: string | null;
          auth_id?: number;
          auth_name?: string | null;
        };
        Relationships: [];
      };
      authority_log: {
        Row: {
          auth_id: number;
          user_id: string;
        };
        Insert: {
          auth_id: number;
          user_id: string;
        };
        Update: {
          auth_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'authority_log_auth_id_fkey';
            columns: ['auth_id'];
            isOneToOne: false;
            referencedRelation: 'authority';
            referencedColumns: ['auth_id'];
          },
        ];
      };
      banner: {
        Row: {
          banner_description: string | null;
          banner_end_date: string;
          banner_id: number;
          banner_image_url: string;
          banner_link: string;
          banner_name: string;
          banner_position: string;
          banner_start_date: string;
          is_active: boolean;
        };
        Insert: {
          banner_description?: string | null;
          banner_end_date: string;
          banner_id?: number;
          banner_image_url: string;
          banner_link: string;
          banner_name: string;
          banner_position: string;
          banner_start_date: string;
          is_active?: boolean;
        };
        Update: {
          banner_description?: string | null;
          banner_end_date?: string;
          banner_id?: number;
          banner_image_url?: string;
          banner_link?: string;
          banner_name?: string;
          banner_position?: string;
          banner_start_date?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      board: {
        Row: {
          board_code: string;
          board_description: string | null;
          board_id: number;
          board_name: string;
        };
        Insert: {
          board_code: string;
          board_description?: string | null;
          board_id?: number;
          board_name: string;
        };
        Update: {
          board_code?: string;
          board_description?: string | null;
          board_id?: number;
          board_name?: string;
        };
        Relationships: [];
      };
      cart: {
        Row: {
          cart_id: number;
          create_at: string;
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Insert: {
          cart_id?: number;
          create_at?: string;
          product_id: number;
          quantity: number;
          user_id: string;
        };
        Update: {
          cart_id?: number;
          create_at?: string;
          product_id?: number;
          quantity?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'cart_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'FK_product_TO_cart_1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      category: {
        Row: {
          category_code: string;
          category_id: number;
          category_name: string;
          parent_code?: string;
        };
        Insert: {
          category_code: string;
          category_id: number;
          category_name: string;
          parent_code?: string;
        };
        Update: {
          category_code?: string;
          category_id?: number;
          category_name?: string;
          parent_code?: string;
        };
        Relationships: [];
      };
      category_log: {
        Row: {
          category_id: number;
          product_id: number;
        };
        Insert: {
          category_id: number;
          product_id: number;
        };
        Update: {
          category_id?: number;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_category_TO_category_list_1';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'category';
            referencedColumns: ['category_id'];
          },
          {
            foreignKeyName: 'FK_product_TO_category_list_1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      comment: {
        Row: {
          comment_content: string;
          comment_id: number;
          create_at: string;
          is_delete: boolean;
          parent_comment_id: number | null;
          post_id: number;
          user_id: string;
        };
        Insert: {
          comment_content: string;
          comment_id?: number;
          create_at?: string;
          is_delete?: boolean;
          parent_comment_id?: number | null;
          post_id: number;
          user_id: string;
        };
        Update: {
          comment_content?: string;
          comment_id?: number;
          create_at?: string;
          is_delete?: boolean;
          parent_comment_id?: number | null;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 'comment_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
        ];
      };
      common_code: {
        Row: {
          code: string;
          code_description: string | null;
          code_name: string;
          group: string;
        };
        Insert: {
          code: string;
          code_description?: string | null;
          code_name: string;
          group: string;
        };
        Update: {
          code?: string;
          code_description?: string | null;
          code_name?: string;
          group?: string;
        };
        Relationships: [];
      };
      delivery_address: {
        Row: {
          address_detail: string;
          address_id: number;
          is_default: boolean;
          post_code: number;
          recipient_name: string;
          recipient_phone: string;
          user_id: string;
        };
        Insert: {
          address_detail: string;
          address_id?: number;
          is_default?: boolean;
          post_code: number;
          recipient_name: string;
          recipient_phone: string;
          user_id: string;
        };
        Update: {
          address_detail?: string;
          address_id?: number;
          is_default?: boolean;
          post_code?: number;
          recipient_name?: string;
          recipient_phone?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'delivery_address_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
        ];
      };
      order: {
        Row: {
          address_id: number;
          order_date: string;
          order_id: number;
          payment_method: string;
          total_price: number;
          user_id: string;
        };
        Insert: {
          address_id: number;
          order_date?: string;
          order_id?: number;
          payment_method: string;
          total_price: number;
          user_id: string;
        };
        Update: {
          address_id?: number;
          order_date?: string;
          order_id?: number;
          payment_method?: string;
          total_price?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_address_id_fkey';
            columns: ['address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_address';
            referencedColumns: ['address_id'];
          },
          {
            foreignKeyName: 'order_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
        ];
      };
      order_item: {
        Row: {
          create_at: string | null;
          order_id: number;
          order_item_id: number;
          order_price: number | null;
          product_id: number;
          quantity: number | null;
        };
        Insert: {
          create_at?: string | null;
          order_id: number;
          order_item_id?: number;
          order_price?: number | null;
          product_id: number;
          quantity?: number | null;
        };
        Update: {
          create_at?: string | null;
          order_id?: number;
          order_item_id?: number;
          order_price?: number | null;
          product_id?: number;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_order_TO_order_item_1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'FK_product_TO_order_item_1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'order_item_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'order_item_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      order_status: {
        Row: {
          order_status_code: string | null;
          order_status_id: number;
          order_status_name: string | null;
          status_description: string | null;
        };
        Insert: {
          order_status_code?: string | null;
          order_status_id?: number;
          order_status_name?: string | null;
          status_description?: string | null;
        };
        Update: {
          order_status_code?: string | null;
          order_status_id?: number;
          order_status_name?: string | null;
          status_description?: string | null;
        };
        Relationships: [];
      };
      order_status_log: {
        Row: {
          order_id: number;
          order_status_id: number;
          update_at: string | null;
        };
        Insert: {
          order_id: number;
          order_status_id: number;
          update_at?: string | null;
        };
        Update: {
          order_id?: number;
          order_status_id?: number;
          update_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_order_status_TO_order_status_log_1';
            columns: ['order_status_id'];
            isOneToOne: false;
            referencedRelation: 'order_status';
            referencedColumns: ['order_status_id'];
          },
          {
            foreignKeyName: 'FK_order_TO_order_status_log_1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'order_status_log_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'order_status_log_order_status_id_fkey';
            columns: ['order_status_id'];
            isOneToOne: false;
            referencedRelation: 'order_status';
            referencedColumns: ['order_status_id'];
          },
        ];
      };
      otp_verification: {
        Row: {
          email: string;
          expires_at: string;
          id: number;
          otp_code: string;
        };
        Insert: {
          email: string;
          expires_at: string;
          id?: number;
          otp_code: string;
        };
        Update: {
          email?: string;
          expires_at?: string;
          id?: number;
          otp_code?: string;
        };
        Relationships: [];
      };
      post: {
        Row: {
          board_id: number;
          create_at: string | null;
          is_delete: boolean;
          is_notice: boolean;
          post_content: string;
          post_id: number;
          post_title: string;
          user_id: string | null;
        };
        Insert: {
          board_id: number;
          create_at?: string | null;
          is_delete?: boolean;
          is_notice?: boolean;
          post_content: string;
          post_id?: number;
          post_title: string;
          user_id?: string | null;
        };
        Update: {
          board_id?: number;
          create_at?: string | null;
          is_delete?: boolean;
          is_notice?: boolean;
          post_content?: string;
          post_id?: number;
          post_title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'post_board_id_fkey';
            columns: ['board_id'];
            isOneToOne: false;
            referencedRelation: 'board';
            referencedColumns: ['board_id'];
          },
          {
            foreignKeyName: 'post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
        ];
      };
      product: {
        Row: {
          author_id: number;
          created_at: string;
          discount: number | null;
          is_active: boolean;
          isbn: string;
          price: number;
          product_id: number;
          product_name: string;
          product_summary: string | null;
          publisher: string;
          stock: number;
          updated_at: string | null;
        };
        Insert: {
          author_id: number;
          created_at?: string;
          discount?: number | null;
          is_active?: boolean;
          isbn: string;
          price: number;
          product_id?: number;
          product_name: string;
          product_summary?: string | null;
          publisher: string;
          stock: number;
          updated_at?: string | null;
        };
        Update: {
          author_id?: number;
          created_at?: string;
          discount?: number | null;
          is_active?: boolean;
          isbn?: string;
          price?: number;
          product_id?: number;
          product_name?: string;
          product_summary?: string | null;
          publisher?: string;
          stock?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'author';
            referencedColumns: ['author_id'];
          },
        ];
      };
      product_badge: {
        Row: {
          badge_created_at: string;
          badge_description: string | null;
          badge_id: number;
          badge_name: string;
        };
        Insert: {
          badge_created_at?: string;
          badge_description?: string | null;
          badge_id?: number;
          badge_name: string;
        };
        Update: {
          badge_created_at?: string;
          badge_description?: string | null;
          badge_id?: number;
          badge_name?: string;
        };
        Relationships: [];
      };
      product_badge_log: {
        Row: {
          badge_id: number;
          product_id: number;
        };
        Insert: {
          badge_id: number;
          product_id: number;
        };
        Update: {
          badge_id?: number;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_badge_log_badge_id_fkey';
            columns: ['badge_id'];
            isOneToOne: false;
            referencedRelation: 'product_badge';
            referencedColumns: ['badge_id'];
          },
          {
            foreignKeyName: 'product_badge_log_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      product_banner_log: {
        Row: {
          banner_id: number;
          created_at: string;
          product_id: number;
        };
        Insert: {
          banner_id: number;
          created_at?: string;
          product_id: number;
        };
        Update: {
          banner_id?: number;
          created_at?: string;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_banner_log_banner_id_fkey';
            columns: ['banner_id'];
            isOneToOne: false;
            referencedRelation: 'banner';
            referencedColumns: ['banner_id'];
          },
          {
            foreignKeyName: 'product_banner_log_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      product_detail: {
        Row: {
          detail_image_url: string;
          product_description: string | null;
          product_detail_id: number;
          product_id: number;
          publichedd_date: string;
        };
        Insert: {
          detail_image_url: string;
          product_description?: string | null;
          product_detail_id?: number;
          product_id: number;
          publichedd_date: string;
        };
        Update: {
          detail_image_url?: string;
          product_description?: string | null;
          product_detail_id?: number;
          product_id?: number;
          publichedd_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_detail_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      product_main_image: {
        Row: {
          created_at: string;
          image_url: string;
          product_id: number;
          product_main_image_id: number;
        };
        Insert: {
          created_at?: string;
          image_url: string;
          product_id: number;
          product_main_image_id: number;
        };
        Update: {
          created_at?: string;
          image_url?: string;
          product_id?: number;
          product_main_image_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_main_image_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
        ];
      };
      product_tag: {
        Row: {
          tag_code: string;
          tag_id: number;
          tag_name: string;
        };
        Insert: {
          tag_code: string;
          tag_id?: number;
          tag_name: string;
        };
        Update: {
          tag_code?: string;
          tag_id?: number;
          tag_name?: string;
        };
        Relationships: [];
      };
      product_tag_log: {
        Row: {
          end_date: string | null;
          product_id: number;
          start_date: string;
          tag_id: number;
        };
        Insert: {
          end_date?: string | null;
          product_id: number;
          start_date: string;
          tag_id: number;
        };
        Update: {
          end_date?: string | null;
          product_id?: number;
          start_date?: string;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_tag_log_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'product_tag';
            referencedColumns: ['tag_id'];
          },
        ];
      };
      user: {
        Row: {
          account_id: string;
          agree_event_notification: boolean;
          agree_marketing: boolean;
          agree_privacy: boolean;
          agree_terms: boolean;
          created_at: string;
          is_delete: boolean;
          is_over_14: boolean;
          update_at: string | null;
          user_id: string;
          user_name: string;
          user_phone: string;
          user_profile_image_url: string | null;
        };
        Insert: {
          account_id: string;
          agree_event_notification: boolean;
          agree_marketing: boolean;
          agree_privacy?: boolean;
          agree_terms?: boolean;
          created_at?: string;
          is_delete?: boolean;
          is_over_14?: boolean;
          update_at?: string | null;
          user_id?: string;
          user_name: string;
          user_phone: string;
          user_profile_image_url?: string | null;
        };
        Update: {
          account_id?: string;
          agree_event_notification?: boolean;
          agree_marketing?: boolean;
          agree_privacy?: boolean;
          agree_terms?: boolean;
          created_at?: string;
          is_delete?: boolean;
          is_over_14?: boolean;
          update_at?: string | null;
          user_id?: string;
          user_name?: string;
          user_phone?: string;
          user_profile_image_url?: string | null;
        };
        Relationships: [];
      };
      wishlist: {
        Row: {
          create_at: string;
          product_id: number;
          user_id: string;
          wishlist_id: number;
        };
        Insert: {
          create_at?: string;
          product_id: number;
          user_id: string;
          wishlist_id?: number;
        };
        Update: {
          create_at?: string;
          product_id?: number;
          user_id?: string;
          wishlist_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'FK_product_TO_wishlist_1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'wishlist_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'wishlist_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['user_id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions['schema']]['Tables'] : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions['schema']]['Tables'] : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums'] : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
