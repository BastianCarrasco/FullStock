PGDMP                      |         	   FullStock    16.2    16.2 V    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    75166 	   FullStock    DATABASE     ~   CREATE DATABASE "FullStock" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "FullStock";
                postgres    false            �            1259    75256    boleta    TABLE     �   CREATE TABLE public.boleta (
    codigobarra character varying(100) NOT NULL,
    idtransaccion integer,
    fechaemision date NOT NULL,
    preciototal numeric NOT NULL,
    detalle character varying(200)
);
    DROP TABLE public.boleta;
       public         heap    postgres    false            �            1259    75184 
   contenedor    TABLE     �   CREATE TABLE public.contenedor (
    idcontenedor integer NOT NULL,
    cantidad numeric NOT NULL,
    fechaactualizacion date NOT NULL
);
    DROP TABLE public.contenedor;
       public         heap    postgres    false            �            1259    75183    contenedor_idcontenedor_seq    SEQUENCE     �   CREATE SEQUENCE public.contenedor_idcontenedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.contenedor_idcontenedor_seq;
       public          postgres    false    220            %           0    0    contenedor_idcontenedor_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.contenedor_idcontenedor_seq OWNED BY public.contenedor.idcontenedor;
          public          postgres    false    219            �            1259    75221    pedido    TABLE     �   CREATE TABLE public.pedido (
    idpedido integer NOT NULL,
    idproveedor integer,
    idproducto integer,
    cantidad numeric NOT NULL,
    fechasolicitud date NOT NULL,
    fecharecepcion date
);
    DROP TABLE public.pedido;
       public         heap    postgres    false            �            1259    75220    pedido_idpedido_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_idpedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.pedido_idpedido_seq;
       public          postgres    false    226            &           0    0    pedido_idpedido_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.pedido_idpedido_seq OWNED BY public.pedido.idpedido;
          public          postgres    false    225            �            1259    75200    producto    TABLE     x  CREATE TABLE public.producto (
    idproducto integer NOT NULL,
    idproveedor integer,
    idcontenedor integer,
    nombre character varying(100) NOT NULL,
    precio numeric NOT NULL,
    descripcion character varying(200),
    tipo character varying(50) NOT NULL,
    codigobarra character varying(100),
    marca character varying(50),
    descuento numeric NOT NULL
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    75199    producto_idproducto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_idproducto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.producto_idproducto_seq;
       public          postgres    false    224            '           0    0    producto_idproducto_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.producto_idproducto_seq OWNED BY public.producto.idproducto;
          public          postgres    false    223            �            1259    75311    productoentransaccion    TABLE     �   CREATE TABLE public.productoentransaccion (
    idtransaccion integer NOT NULL,
    idproducto integer NOT NULL,
    cantidad numeric NOT NULL
);
 )   DROP TABLE public.productoentransaccion;
       public         heap    postgres    false            �            1259    75269    promo    TABLE     �   CREATE TABLE public.promo (
    idpromo integer NOT NULL,
    cantidad numeric NOT NULL,
    preciototal numeric NOT NULL,
    descripcion character varying(200),
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.promo;
       public         heap    postgres    false            �            1259    75268    promo_idpromo_seq    SEQUENCE     �   CREATE SEQUENCE public.promo_idpromo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.promo_idpromo_seq;
       public          postgres    false    231            (           0    0    promo_idpromo_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.promo_idpromo_seq OWNED BY public.promo.idpromo;
          public          postgres    false    230            �            1259    75294    promoentransaccion    TABLE     �   CREATE TABLE public.promoentransaccion (
    idtransaccion integer NOT NULL,
    idpromo integer NOT NULL,
    cantidad numeric NOT NULL
);
 &   DROP TABLE public.promoentransaccion;
       public         heap    postgres    false            �            1259    75277    promoproductos    TABLE     �   CREATE TABLE public.promoproductos (
    idpromo integer NOT NULL,
    idproducto integer NOT NULL,
    cantidad numeric NOT NULL
);
 "   DROP TABLE public.promoproductos;
       public         heap    postgres    false            �            1259    75193 	   proveedor    TABLE     �   CREATE TABLE public.proveedor (
    idproveedor integer NOT NULL,
    nombre character varying(50) NOT NULL,
    infocontacto character varying(50) NOT NULL
);
    DROP TABLE public.proveedor;
       public         heap    postgres    false            �            1259    75192    proveedor_idproveedor_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedor_idproveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.proveedor_idproveedor_seq;
       public          postgres    false    222            )           0    0    proveedor_idproveedor_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.proveedor_idproveedor_seq OWNED BY public.proveedor.idproveedor;
          public          postgres    false    221            �            1259    75175    reportes    TABLE     �   CREATE TABLE public.reportes (
    idreporte integer NOT NULL,
    fecha date NOT NULL,
    ganancias numeric NOT NULL,
    gastos numeric NOT NULL,
    detalle character varying(200),
    observacion character varying(200)
);
    DROP TABLE public.reportes;
       public         heap    postgres    false            �            1259    75174    reportes_idreporte_seq    SEQUENCE     �   CREATE SEQUENCE public.reportes_idreporte_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.reportes_idreporte_seq;
       public          postgres    false    218            *           0    0    reportes_idreporte_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.reportes_idreporte_seq OWNED BY public.reportes.idreporte;
          public          postgres    false    217            �            1259    75240    transaccion    TABLE     �   CREATE TABLE public.transaccion (
    idtransaccion integer NOT NULL,
    idusuario integer,
    idreporte integer,
    estado character varying(50) NOT NULL,
    metodopago character varying(50) NOT NULL
);
    DROP TABLE public.transaccion;
       public         heap    postgres    false            �            1259    75239    transaccion_idtransaccion_seq    SEQUENCE     �   CREATE SEQUENCE public.transaccion_idtransaccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.transaccion_idtransaccion_seq;
       public          postgres    false    228            +           0    0    transaccion_idtransaccion_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.transaccion_idtransaccion_seq OWNED BY public.transaccion.idtransaccion;
          public          postgres    false    227            �            1259    75168    usuario    TABLE     �   CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    75167    usuario_idusuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.usuario_idusuario_seq;
       public          postgres    false    216            ,           0    0    usuario_idusuario_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;
          public          postgres    false    215            O           2604    75187    contenedor idcontenedor    DEFAULT     �   ALTER TABLE ONLY public.contenedor ALTER COLUMN idcontenedor SET DEFAULT nextval('public.contenedor_idcontenedor_seq'::regclass);
 F   ALTER TABLE public.contenedor ALTER COLUMN idcontenedor DROP DEFAULT;
       public          postgres    false    219    220    220            R           2604    75224    pedido idpedido    DEFAULT     r   ALTER TABLE ONLY public.pedido ALTER COLUMN idpedido SET DEFAULT nextval('public.pedido_idpedido_seq'::regclass);
 >   ALTER TABLE public.pedido ALTER COLUMN idpedido DROP DEFAULT;
       public          postgres    false    226    225    226            Q           2604    75203    producto idproducto    DEFAULT     z   ALTER TABLE ONLY public.producto ALTER COLUMN idproducto SET DEFAULT nextval('public.producto_idproducto_seq'::regclass);
 B   ALTER TABLE public.producto ALTER COLUMN idproducto DROP DEFAULT;
       public          postgres    false    224    223    224            T           2604    75272    promo idpromo    DEFAULT     n   ALTER TABLE ONLY public.promo ALTER COLUMN idpromo SET DEFAULT nextval('public.promo_idpromo_seq'::regclass);
 <   ALTER TABLE public.promo ALTER COLUMN idpromo DROP DEFAULT;
       public          postgres    false    230    231    231            P           2604    75196    proveedor idproveedor    DEFAULT     ~   ALTER TABLE ONLY public.proveedor ALTER COLUMN idproveedor SET DEFAULT nextval('public.proveedor_idproveedor_seq'::regclass);
 D   ALTER TABLE public.proveedor ALTER COLUMN idproveedor DROP DEFAULT;
       public          postgres    false    221    222    222            N           2604    75178    reportes idreporte    DEFAULT     x   ALTER TABLE ONLY public.reportes ALTER COLUMN idreporte SET DEFAULT nextval('public.reportes_idreporte_seq'::regclass);
 A   ALTER TABLE public.reportes ALTER COLUMN idreporte DROP DEFAULT;
       public          postgres    false    217    218    218            S           2604    75243    transaccion idtransaccion    DEFAULT     �   ALTER TABLE ONLY public.transaccion ALTER COLUMN idtransaccion SET DEFAULT nextval('public.transaccion_idtransaccion_seq'::regclass);
 H   ALTER TABLE public.transaccion ALTER COLUMN idtransaccion DROP DEFAULT;
       public          postgres    false    227    228    228            M           2604    75171    usuario idusuario    DEFAULT     v   ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);
 @   ALTER TABLE public.usuario ALTER COLUMN idusuario DROP DEFAULT;
       public          postgres    false    216    215    216                      0    75256    boleta 
   TABLE DATA           `   COPY public.boleta (codigobarra, idtransaccion, fechaemision, preciototal, detalle) FROM stdin;
    public          postgres    false    229   �j                 0    75184 
   contenedor 
   TABLE DATA           P   COPY public.contenedor (idcontenedor, cantidad, fechaactualizacion) FROM stdin;
    public          postgres    false    220   k                 0    75221    pedido 
   TABLE DATA           m   COPY public.pedido (idpedido, idproveedor, idproducto, cantidad, fechasolicitud, fecharecepcion) FROM stdin;
    public          postgres    false    226   Sk                 0    75200    producto 
   TABLE DATA           �   COPY public.producto (idproducto, idproveedor, idcontenedor, nombre, precio, descripcion, tipo, codigobarra, marca, descuento) FROM stdin;
    public          postgres    false    224   �k                 0    75311    productoentransaccion 
   TABLE DATA           T   COPY public.productoentransaccion (idtransaccion, idproducto, cantidad) FROM stdin;
    public          postgres    false    234   �l                 0    75269    promo 
   TABLE DATA           T   COPY public.promo (idpromo, cantidad, preciototal, descripcion, nombre) FROM stdin;
    public          postgres    false    231   �l                 0    75294    promoentransaccion 
   TABLE DATA           N   COPY public.promoentransaccion (idtransaccion, idpromo, cantidad) FROM stdin;
    public          postgres    false    233   �m                 0    75277    promoproductos 
   TABLE DATA           G   COPY public.promoproductos (idpromo, idproducto, cantidad) FROM stdin;
    public          postgres    false    232   �m                 0    75193 	   proveedor 
   TABLE DATA           F   COPY public.proveedor (idproveedor, nombre, infocontacto) FROM stdin;
    public          postgres    false    222   �m                 0    75175    reportes 
   TABLE DATA           ]   COPY public.reportes (idreporte, fecha, ganancias, gastos, detalle, observacion) FROM stdin;
    public          postgres    false    218   in                 0    75240    transaccion 
   TABLE DATA           ^   COPY public.transaccion (idtransaccion, idusuario, idreporte, estado, metodopago) FROM stdin;
    public          postgres    false    228   o                 0    75168    usuario 
   TABLE DATA           O   COPY public.usuario (idusuario, nombre, apellido, email, password) FROM stdin;
    public          postgres    false    216   �o       -           0    0    contenedor_idcontenedor_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.contenedor_idcontenedor_seq', 11, true);
          public          postgres    false    219            .           0    0    pedido_idpedido_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.pedido_idpedido_seq', 5, true);
          public          postgres    false    225            /           0    0    producto_idproducto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_idproducto_seq', 40, true);
          public          postgres    false    223            0           0    0    promo_idpromo_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.promo_idpromo_seq', 5, true);
          public          postgres    false    230            1           0    0    proveedor_idproveedor_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.proveedor_idproveedor_seq', 11, true);
          public          postgres    false    221            2           0    0    reportes_idreporte_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reportes_idreporte_seq', 11, true);
          public          postgres    false    217            3           0    0    transaccion_idtransaccion_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.transaccion_idtransaccion_seq', 5, true);
          public          postgres    false    227            4           0    0    usuario_idusuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_idusuario_seq', 12, true);
          public          postgres    false    215            f           2606    75262    boleta pk_boleta 
   CONSTRAINT     W   ALTER TABLE ONLY public.boleta
    ADD CONSTRAINT pk_boleta PRIMARY KEY (codigobarra);
 :   ALTER TABLE ONLY public.boleta DROP CONSTRAINT pk_boleta;
       public            postgres    false    229            Z           2606    75191    contenedor pk_contenedor 
   CONSTRAINT     `   ALTER TABLE ONLY public.contenedor
    ADD CONSTRAINT pk_contenedor PRIMARY KEY (idcontenedor);
 B   ALTER TABLE ONLY public.contenedor DROP CONSTRAINT pk_contenedor;
       public            postgres    false    220            b           2606    75228    pedido pk_pedido 
   CONSTRAINT     T   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pk_pedido PRIMARY KEY (idpedido);
 :   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pk_pedido;
       public            postgres    false    226            ^           2606    75207    producto pk_producto 
   CONSTRAINT     Z   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT pk_producto PRIMARY KEY (idproducto);
 >   ALTER TABLE ONLY public.producto DROP CONSTRAINT pk_producto;
       public            postgres    false    224            n           2606    75317 .   productoentransaccion pk_productoentransaccion 
   CONSTRAINT     �   ALTER TABLE ONLY public.productoentransaccion
    ADD CONSTRAINT pk_productoentransaccion PRIMARY KEY (idtransaccion, idproducto);
 X   ALTER TABLE ONLY public.productoentransaccion DROP CONSTRAINT pk_productoentransaccion;
       public            postgres    false    234    234            h           2606    75276    promo pk_promo 
   CONSTRAINT     Q   ALTER TABLE ONLY public.promo
    ADD CONSTRAINT pk_promo PRIMARY KEY (idpromo);
 8   ALTER TABLE ONLY public.promo DROP CONSTRAINT pk_promo;
       public            postgres    false    231            l           2606    75300 (   promoentransaccion pk_promoentransaccion 
   CONSTRAINT     z   ALTER TABLE ONLY public.promoentransaccion
    ADD CONSTRAINT pk_promoentransaccion PRIMARY KEY (idtransaccion, idpromo);
 R   ALTER TABLE ONLY public.promoentransaccion DROP CONSTRAINT pk_promoentransaccion;
       public            postgres    false    233    233            j           2606    75283     promoproductos pk_promoproductos 
   CONSTRAINT     o   ALTER TABLE ONLY public.promoproductos
    ADD CONSTRAINT pk_promoproductos PRIMARY KEY (idpromo, idproducto);
 J   ALTER TABLE ONLY public.promoproductos DROP CONSTRAINT pk_promoproductos;
       public            postgres    false    232    232            \           2606    75198    proveedor pk_proveedor 
   CONSTRAINT     ]   ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT pk_proveedor PRIMARY KEY (idproveedor);
 @   ALTER TABLE ONLY public.proveedor DROP CONSTRAINT pk_proveedor;
       public            postgres    false    222            X           2606    75182    reportes pk_reportes 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reportes
    ADD CONSTRAINT pk_reportes PRIMARY KEY (idreporte);
 >   ALTER TABLE ONLY public.reportes DROP CONSTRAINT pk_reportes;
       public            postgres    false    218            d           2606    75245    transaccion pk_transaccion 
   CONSTRAINT     c   ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT pk_transaccion PRIMARY KEY (idtransaccion);
 D   ALTER TABLE ONLY public.transaccion DROP CONSTRAINT pk_transaccion;
       public            postgres    false    228            V           2606    75173    usuario pk_usuario 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT pk_usuario PRIMARY KEY (idusuario);
 <   ALTER TABLE ONLY public.usuario DROP CONSTRAINT pk_usuario;
       public            postgres    false    216            `           2606    75209 !   producto producto_codigobarra_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_codigobarra_key UNIQUE (codigobarra);
 K   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_codigobarra_key;
       public            postgres    false    224            u           2606    75263    boleta fk_boleta_transaccion    FK CONSTRAINT     �   ALTER TABLE ONLY public.boleta
    ADD CONSTRAINT fk_boleta_transaccion FOREIGN KEY (idtransaccion) REFERENCES public.transaccion(idtransaccion) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.boleta DROP CONSTRAINT fk_boleta_transaccion;
       public          postgres    false    228    229    4708            q           2606    75234    pedido fk_pedido_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_producto FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.pedido DROP CONSTRAINT fk_pedido_producto;
       public          postgres    false    226    4702    224            r           2606    75229    pedido fk_pedido_proveedor    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT fk_pedido_proveedor FOREIGN KEY (idproveedor) REFERENCES public.proveedor(idproveedor) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.pedido DROP CONSTRAINT fk_pedido_proveedor;
       public          postgres    false    226    4700    222            o           2606    75215    producto fk_producto_contenedor    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_producto_contenedor FOREIGN KEY (idcontenedor) REFERENCES public.contenedor(idcontenedor) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_producto_contenedor;
       public          postgres    false    224    4698    220            p           2606    75210    producto fk_producto_proveedor    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_producto_proveedor FOREIGN KEY (idproveedor) REFERENCES public.proveedor(idproveedor) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_producto_proveedor;
       public          postgres    false    222    224    4700            z           2606    75323 7   productoentransaccion fk_productoentransaccion_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productoentransaccion
    ADD CONSTRAINT fk_productoentransaccion_producto FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.productoentransaccion DROP CONSTRAINT fk_productoentransaccion_producto;
       public          postgres    false    234    224    4702            {           2606    75318 :   productoentransaccion fk_productoentransaccion_transaccion    FK CONSTRAINT     �   ALTER TABLE ONLY public.productoentransaccion
    ADD CONSTRAINT fk_productoentransaccion_transaccion FOREIGN KEY (idtransaccion) REFERENCES public.transaccion(idtransaccion) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.productoentransaccion DROP CONSTRAINT fk_productoentransaccion_transaccion;
       public          postgres    false    228    4708    234            x           2606    75306 .   promoentransaccion fk_promoentransaccion_promo    FK CONSTRAINT     �   ALTER TABLE ONLY public.promoentransaccion
    ADD CONSTRAINT fk_promoentransaccion_promo FOREIGN KEY (idpromo) REFERENCES public.promo(idpromo) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.promoentransaccion DROP CONSTRAINT fk_promoentransaccion_promo;
       public          postgres    false    4712    233    231            y           2606    75301 4   promoentransaccion fk_promoentransaccion_transaccion    FK CONSTRAINT     �   ALTER TABLE ONLY public.promoentransaccion
    ADD CONSTRAINT fk_promoentransaccion_transaccion FOREIGN KEY (idtransaccion) REFERENCES public.transaccion(idtransaccion) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.promoentransaccion DROP CONSTRAINT fk_promoentransaccion_transaccion;
       public          postgres    false    4708    233    228            v           2606    75289 )   promoproductos fk_promoproductos_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.promoproductos
    ADD CONSTRAINT fk_promoproductos_producto FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.promoproductos DROP CONSTRAINT fk_promoproductos_producto;
       public          postgres    false    232    4702    224            w           2606    75284 &   promoproductos fk_promoproductos_promo    FK CONSTRAINT     �   ALTER TABLE ONLY public.promoproductos
    ADD CONSTRAINT fk_promoproductos_promo FOREIGN KEY (idpromo) REFERENCES public.promo(idpromo) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.promoproductos DROP CONSTRAINT fk_promoproductos_promo;
       public          postgres    false    232    231    4712            s           2606    75251 #   transaccion fk_transaccion_reportes    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT fk_transaccion_reportes FOREIGN KEY (idreporte) REFERENCES public.reportes(idreporte) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.transaccion DROP CONSTRAINT fk_transaccion_reportes;
       public          postgres    false    228    4696    218            t           2606    75246 "   transaccion fk_transaccion_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT fk_transaccion_usuario FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.transaccion DROP CONSTRAINT fk_transaccion_usuario;
       public          postgres    false    216    4694    228               r   x�u�11D�z|�\`��o؞c�,"]$�/ i��,͗l�����}�Fj��^g�-=Z�g�?��N&>�gPQC}��y�S��R�Y8���/�w˟Bn*"oV�<�         8   x�Mȹ  ������]�(SJ��Ѵ�'�%�G�M�2I�2���|�b5         N   x�U��� ���.�,�	�h?�OgɊ
A��I"il��h��\~�4tX[�olt��:�
ֱ@�_ˑb<$'���         �   x�M��j�0���z�'q>�I��`������I�]����3o5���a�tЇ����5��B]��G�U���X��6��oe�Q7���a�D���	���as�U�?�ݔ�M�˿zH{��{B���=��n>G|�1̴(�*ޟ���N�c^7v�[�5{��9S�Ğ";��⾩��l�r"��E�ߛՕW��I{	Z(������}:�k-�©��������v�WY���w         -   x���  ��������� =x2xa%ޔ������$=n?         �   x�3�4�45�3�(���O�<�9O!%U�,�(1/�3L)�pq ��̼���"�jO(�ޘӂ��T�MuAQfn"�x�8�Qo�ih�ih�i~~I�����`
�����@���������NW(�8F��� %H�         '   x�3�4�4�2�B.cNc ۄӄӘ˔�(���� K�,         -   x�3�46�4�2�46�4�2�4��4�2�4�
�p� c���� mc9         ]   x�3�(�/KMM�/Rp�L��+IL.�w(�	&�%��rY �r���KCR�Va���,hN1BM2X���"4cR J���bqO*XY� MwA:         �   x�}�;
�0�Y:�/#˖�(t�҇�BiJRr���Dt�$���J��a�88!�,[����{�?�88]�:���cz�����o���Z�o%�p`,
$�-�B�t�<:R!C�_4���S�#tN��E��]A:��h���Zj         }   x�m�;�0@g�9"|̨{��,��JA�Tnĝz�^�d����"�*���?ZH�w� طUR�x�{�W��V�I��_�3<*���3�ap�eRW�Da$c�Dx�xl�d[Ƕ�B�͝�뀈��6u         �   x�e���0�����"�L�&DW�Ki�R҂��с��}16�v�����/�}�5��m�n4g�G�(�F�Px�<\��h����_M�F[�5uk�I��U�f)䲰��U�+9�Q����� �Y3Z?�D�Q���{[�m8�-Ze�LA�ʎ,b��<�R�)"����_�I=��>+5Vj"#�`�� ^�     