PGDMP     6            	    
    |            ACFI    15.2    15.2     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    65744    ACFI    DATABASE     }   CREATE DATABASE "ACFI" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE "ACFI";
                postgres    false            �            1259    65891    cart    TABLE     �   CREATE TABLE public.cart (
    cart_user text NOT NULL,
    cart_product integer NOT NULL,
    cart_quantity integer NOT NULL,
    CONSTRAINT cart_cart_quantity_check CHECK ((cart_quantity > 0))
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    65841    category    TABLE     �   CREATE TABLE public.category (
    category_name text NOT NULL,
    CONSTRAINT category_category_name_check CHECK ((category_name <> ''::text))
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    65850    product    TABLE     �  CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_description text NOT NULL,
    product_price numeric NOT NULL,
    product_category text,
    CONSTRAINT product_product_description_check CHECK ((product_description <> ''::text)),
    CONSTRAINT product_product_name_check CHECK ((product_name <> ''::text)),
    CONSTRAINT product_product_price_check CHECK ((product_price > (0)::numeric))
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    65849    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    216            )           0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    215            �            1259    65866    role    TABLE        CREATE TABLE public.role (
    role_name text NOT NULL,
    CONSTRAINT role_role_name_check CHECK ((role_name <> ''::text))
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    65874    users    TABLE     E  CREATE TABLE public.users (
    user_email text NOT NULL,
    user_name text NOT NULL,
    user_password text NOT NULL,
    user_address text NOT NULL,
    user_phone text NOT NULL,
    user_role text NOT NULL,
    CONSTRAINT users_user_address_check CHECK ((user_address <> ''::text)),
    CONSTRAINT users_user_email_check CHECK ((user_email <> ''::text)),
    CONSTRAINT users_user_name_check CHECK ((user_name <> ''::text)),
    CONSTRAINT users_user_password_check CHECK ((user_password <> ''::text)),
    CONSTRAINT users_user_phone_check CHECK ((user_phone <> ''::text))
);
    DROP TABLE public.users;
       public         heap    postgres    false            u           2604    65853    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    216    215    216            "          0    65891    cart 
   TABLE DATA           F   COPY public.cart (cart_user, cart_product, cart_quantity) FROM stdin;
    public          postgres    false    219   �                  0    65841    category 
   TABLE DATA           1   COPY public.category (category_name) FROM stdin;
    public          postgres    false    214   >!                 0    65850    product 
   TABLE DATA           q   COPY public.product (product_id, product_name, product_description, product_price, product_category) FROM stdin;
    public          postgres    false    216   �!                  0    65866    role 
   TABLE DATA           )   COPY public.role (role_name) FROM stdin;
    public          postgres    false    217   	%       !          0    65874    users 
   TABLE DATA           j   COPY public.users (user_email, user_name, user_password, user_address, user_phone, user_role) FROM stdin;
    public          postgres    false    218   ;%       *           0    0    product_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_product_id_seq', 32, true);
          public          postgres    false    215            �           2606    65898    cart cart_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_user, cart_product);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    219    219            �           2606    65848    category category_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_name);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    214            �           2606    65860    product product_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    216            �           2606    65873    role role_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_name);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    217            �           2606    65885    users users_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            �           2606    65904    cart cart_cart_product_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cart_product_fkey FOREIGN KEY (cart_product) REFERENCES public.product(product_id);
 E   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_cart_product_fkey;
       public          postgres    false    216    219    3204            �           2606    65899    cart cart_cart_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cart_user_fkey FOREIGN KEY (cart_user) REFERENCES public.users(user_email);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_cart_user_fkey;
       public          postgres    false    219    218    3208            �           2606    65861 %   product product_product_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_category_fkey FOREIGN KEY (product_category) REFERENCES public.category(category_name);
 O   ALTER TABLE ONLY public.product DROP CONSTRAINT product_product_category_fkey;
       public          postgres    false    216    214    3202            �           2606    65886    users users_user_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_fkey FOREIGN KEY (user_role) REFERENCES public.role(role_name);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_role_fkey;
       public          postgres    false    217    218    3206            "   O   x�+��/M�tH���K-�4�4�*B1�4D1�4F��Pch�i�.d�i�.d�a���YF&�B朦hB�F��\1z\\\ �4@o         K   x�˱�0���a"�y�� ;�`zR]uަ7��j���`�e��8��3�`����";���TW#���77         `  x�uTKr�6]C��	T�X���ș���k<�T6M�EA@�f��9���DG�I�@�5�,$����?s��պ� K��}��7�rV*��$w�J�η��0��J�}���5Mb�w�j�%񎼧�Pe!���z*����T�q}
l[�<�<E��^_G}�����dr���QF��}~�ʎ�������H�G�/^Wnto�]6@"�ƅ���9,�����RsLo�wϧW�NY�*�v�UR|��s-�k�@��>����]�����Wl�b�.܈'2��	2��^�܊/�F�!{J��&]傋��8�/;Oa2��-*�U4�	@ (�z����3.�14�������n!~!K{��_!�P�������ޫZnO/�u�tcY*�kp�Č���4�_�*h�c��&��iu�w����N+X"ﳛ�����_6>��]D&�t���|�[Ă�F^���8{��j�T�A����Zl0K��@YQ`ҔA�2O�c7b�k�N|��hwH9Z/�ַ�g�Gg���ۤ������#��-{ta����3�QF��x��τ�ۊM�/ݍmfMa��T\�U�9.�a�	�?�+v�I�W�t	2�����%t��<�l%�F�i�J�W�=�ڨ�`�u�����WYƬĖ
���;�Ԓx|ͭV0]�Gg�������DBMh*ҁ#�1�Z|>�`��#�7������y}+���(~:�~?rb"d>�{څ�y��K?�C��=M������`��¶��rvf�>-�� o���v���|*�x.��T7�g���+*��m�D�o��n���?��a��`��Zmz���L}6��N&�|�h�          "   x�KL����J/M-.�J.-.��M-����� �j      !   �  x���;��0�Z��"�n�u�7E}�	1B@�!¯ff�gK��|_s������~MU��0M��$��+�6�K5_��DxN��N��:7�2P]g����f��w�sx.���}��~��j�sҔ���%���8��F��ܙv�w�x�P�]���jT���(Nޤ�4������ fգ$����.�Z��e�Z�sw//�u��BP����|LO�%���Vϊ�5;�B��A�k]�(��)�3�T1A�BvsN�Q ��M������a�5��/�d/h5J���O�M�(͆���f2��\B�{>��Y�hq���isNxպ4�ȱl&/�����]z����&9�丿�|�w�^e���߹/%�D��%p6���^iS���O{�.8ýL���6~�֜:������GD+v)�[�-{��黮P[?~ā3��?�p8�n��}     