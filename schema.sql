USE [master]
GO
/****** Object:  Database [SportShop]    Script Date: 29/10/2023 9:06:41 AM ******/
CREATE DATABASE [SportShop]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SportShop', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SportShop.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SportShop_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SportShop_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SportShop] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SportShop].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SportShop] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SportShop] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SportShop] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SportShop] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SportShop] SET ARITHABORT OFF 
GO
ALTER DATABASE [SportShop] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SportShop] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SportShop] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SportShop] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SportShop] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SportShop] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SportShop] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SportShop] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SportShop] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SportShop] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SportShop] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SportShop] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SportShop] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SportShop] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SportShop] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SportShop] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SportShop] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SportShop] SET RECOVERY FULL 
GO
ALTER DATABASE [SportShop] SET  MULTI_USER 
GO
ALTER DATABASE [SportShop] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SportShop] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SportShop] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SportShop] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SportShop] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SportShop] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SportShop', N'ON'
GO
ALTER DATABASE [SportShop] SET QUERY_STORE = OFF
GO
USE [SportShop]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[description] [nvarchar](100) NULL,
	[status] [bit] NOT NULL,
	[createdDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Colors]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Colors](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[colorCode] [nvarchar](20) NOT NULL,
	[description] [nvarchar](100) NULL,
	[status] [bit] NOT NULL,
	[createdDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Colors] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetailInCarts]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetailInCarts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product] [int] NOT NULL,
	[color] [int] NOT NULL,
	[size] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[customer] [int] NOT NULL,
	[check] [bit] NOT NULL,
	[status] [bit] NOT NULL,
	[createdDate] [datetime] NOT NULL,
 CONSTRAINT [PK_OrderDetailInCart] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customer] [int] NOT NULL,
	[fullName] [nvarchar](100) NOT NULL,
	[phoneNumber] [varchar](15) NOT NULL,
	[address] [nvarchar](200) NOT NULL,
	[total] [float] NOT NULL,
	[orderDate] [datetime] NOT NULL,
	[createdDate] [datetime] NOT NULL,
	[orderDetails] [nvarchar](max) NOT NULL,
	[status] [tinyint] NOT NULL,
	[description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetails]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[price] [float] NOT NULL,
	[quantity] [int] NOT NULL,
	[size] [int] NOT NULL,
	[color] [int] NOT NULL,
	[product] [int] NOT NULL,
	[createdDate] [datetime] NOT NULL,
 CONSTRAINT [PK_ProductDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[image] [varchar](max) NOT NULL,
	[category] [int] NOT NULL,
	[description] [nvarchar](max) NULL,
	[createdDate] [datetime] NOT NULL,
	[status] [bit] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sizes]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sizes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[size] [int] NOT NULL,
	[description] [nvarchar](100) NULL,
	[status] [bit] NOT NULL,
	[createdDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Sized] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 29/10/2023 9:06:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](30) NOT NULL,
	[lastName] [nvarchar](30) NOT NULL,
	[username] [nvarchar](30) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[email] [nvarchar](30) NULL,
	[phoneNumber] [nvarchar](15) NULL,
	[address] [nvarchar](100) NULL,
	[createdDate] [datetime] NOT NULL,
	[avatar] [varchar](max) NOT NULL,
	[status] [bit] NOT NULL,
	[checkAll] [bit] NOT NULL,
	[role] [tinyint] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([id], [name], [description], [status], [createdDate]) VALUES (1, N'Njke', N'test2', 1, CAST(N'2023-10-28T16:01:00.000' AS DateTime))
INSERT [dbo].[Categories] ([id], [name], [description], [status], [createdDate]) VALUES (2, N'Puma', N'test3', 1, CAST(N'2023-10-29T01:37:00.000' AS DateTime))
INSERT [dbo].[Categories] ([id], [name], [description], [status], [createdDate]) VALUES (3, N'Adidas', N'test4', 1, CAST(N'2023-10-29T01:37:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Colors] ON 

INSERT [dbo].[Colors] ([id], [name], [colorCode], [description], [status], [createdDate]) VALUES (1, N'White', N'#ffffff', N'test', 1, CAST(N'2023-10-28T16:12:00.000' AS DateTime))
INSERT [dbo].[Colors] ([id], [name], [colorCode], [description], [status], [createdDate]) VALUES (2, N'Black', N'#000000', N'Đen tuyền', 1, CAST(N'2023-10-29T01:24:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Colors] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetailInCarts] ON 

INSERT [dbo].[OrderDetailInCarts] ([id], [product], [color], [size], [quantity], [customer], [check], [status], [createdDate]) VALUES (1, 1, 1, 1, 1, 1, 1, 0, CAST(N'2023-10-28T19:13:00.000' AS DateTime))
INSERT [dbo].[OrderDetailInCarts] ([id], [product], [color], [size], [quantity], [customer], [check], [status], [createdDate]) VALUES (2, 18, 1, 1, 1, 3, 1, 0, CAST(N'2023-10-29T02:40:00.000' AS DateTime))
INSERT [dbo].[OrderDetailInCarts] ([id], [product], [color], [size], [quantity], [customer], [check], [status], [createdDate]) VALUES (3, 18, 1, 1, 2, 3, 1, 1, CAST(N'2023-10-29T03:45:00.000' AS DateTime))
INSERT [dbo].[OrderDetailInCarts] ([id], [product], [color], [size], [quantity], [customer], [check], [status], [createdDate]) VALUES (4, 18, 2, 1, 1, 3, 1, 1, CAST(N'2023-10-29T03:46:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[OrderDetailInCarts] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([id], [customer], [fullName], [phoneNumber], [address], [total], [orderDate], [createdDate], [orderDetails], [status], [description]) VALUES (1, 3, N'Kiem', N'03738283747', N'17A', 15, CAST(N'2022-10-28T21:05:00.000' AS DateTime), CAST(N'2022-10-28T21:05:00.000' AS DateTime), N'[ { "id": 3, "color": { "id": 1, "name": "White", "colorCode": "#ffffff", "description": "test", "status": true, "createdDate": "2023-10-28T16:12:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 2, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 80, "totalPrice": 160 }, { "id": 4, "color": { "id": 2, "name": "Black", "colorCode": "#000000", "description": "Đen tuyền", "status": true, "createdDate": "2023-10-29T01:24:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 1, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 70, "totalPrice": 70 } ]', 1, NULL)
INSERT [dbo].[Orders] ([id], [customer], [fullName], [phoneNumber], [address], [total], [orderDate], [createdDate], [orderDetails], [status], [description]) VALUES (2, 3, N'Kiem', N'03738283747', N'17A', 15, CAST(N'2023-10-28T21:06:00.000' AS DateTime), CAST(N'2023-10-28T21:06:00.000' AS DateTime), N'[ { "id": 3, "color": { "id": 1, "name": "White", "colorCode": "#ffffff", "description": "test", "status": true, "createdDate": "2023-10-28T16:12:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 2, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 80, "totalPrice": 160 }, { "id": 4, "color": { "id": 2, "name": "Black", "colorCode": "#000000", "description": "Đen tuyền", "status": true, "createdDate": "2023-10-29T01:24:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 1, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 70, "totalPrice": 70 } ]', 2, NULL)
INSERT [dbo].[Orders] ([id], [customer], [fullName], [phoneNumber], [address], [total], [orderDate], [createdDate], [orderDetails], [status], [description]) VALUES (17, 3, N'Pham Doan Kiem', N'+84373926165', N'17A Cong Hoa', 230, CAST(N'2023-10-29T04:39:00.000' AS DateTime), CAST(N'2023-10-29T04:39:00.000' AS DateTime), N'[ { "id": 3, "color": { "id": 1, "name": "White", "colorCode": "#ffffff", "description": "test", "status": true, "createdDate": "2023-10-28T16:12:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 2, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 80, "totalPrice": 160 }, { "id": 4, "color": { "id": 2, "name": "Black", "colorCode": "#000000", "description": "Đen tuyền", "status": true, "createdDate": "2023-10-29T01:24:00.000Z" }, "product": { "id": 18, "name": "Sản phẩm Z", "image": "https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media", "category": 3, "description": "", "createdDate": "2023-10-29T02:31:00.000Z", "status": true, "productDetails": [ { "id": 29, "price": 80, "quantity": 100, "size": 1, "color": 1, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" }, { "id": 30, "price": 70, "quantity": 80, "size": 1, "color": 2, "product": 18, "createdDate": "2023-10-29T02:31:00.000Z" } ] }, "size": { "id": 1, "size": 24, "description": "test", "status": true, "createdDate": "2023-10-28T15:58:00.000Z" }, "quantity": 1, "category": { "id": 3, "name": "Adidas", "description": "test4", "status": true, "createdDate": "2023-10-29T01:37:00.000Z" }, "price": 70, "totalPrice": 70 } ]', 1, NULL)
INSERT [dbo].[Orders] ([id], [customer], [fullName], [phoneNumber], [address], [total], [orderDate], [createdDate], [orderDetails], [status], [description]) VALUES (18, 0, N'Pham Doan Kiem', N'+84373926165', N'17A Cong Hoa', 25, CAST(N'2023-10-29T08:44:00.000' AS DateTime), CAST(N'2023-10-29T08:44:00.000' AS DateTime), N'[{"id":0,"color":{"id":2,"name":"Black","colorCode":"#000000","description":"Đen tuyền","status":true,"createdDate":"2023-10-29T01:24:00.000Z"},"product":{"id":15,"name":"Sản phẩm N","image":"https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media","category":1,"description":"","createdDate":"2023-10-29T01:55:00.000Z","status":true,"productDetails":[{"id":23,"price":25,"quantity":15,"size":1,"color":2,"product":15,"createdDate":"2023-10-29T01:55:00.000Z"}]},"size":{"id":1,"size":24,"description":"test","status":true,"createdDate":"2023-10-28T15:58:00.000Z"},"quantity":1,"category":{"id":1,"name":"Njke","description":"test2","status":true,"createdDate":"2023-10-28T16:01:00.000Z"},"price":25,"totalPrice":25}]', 0, NULL)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductDetails] ON 

INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (1, 15, 30, 1, 1, 1, CAST(N'2023-10-28T17:52:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (2, 25, 15, 1, 1, 7, CAST(N'2023-10-28T18:13:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (3, 25, 15, 1, 1, 8, CAST(N'2023-10-28T18:29:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (4, 25, 15, 1, 1, 8, CAST(N'2023-10-28T18:29:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (5, 25, 15, 1, 1, 9, CAST(N'2023-10-28T18:32:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (6, 25, 15, 1, 1, 9, CAST(N'2023-10-28T18:32:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (7, 25, 30, 1, 1, 10, CAST(N'2023-10-28T18:38:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (8, 25, 30, 1, 1, 11, CAST(N'2023-10-28T18:39:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (20, 25, 15, 1, 1, 2, CAST(N'2023-10-28T18:57:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (21, 25, 15, 2, 1, 13, CAST(N'2023-10-29T01:49:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (22, 25, 15, 1, 2, 14, CAST(N'2023-10-29T01:53:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (23, 25, 14, 1, 2, 15, CAST(N'2023-10-29T01:55:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (24, 25, 15, 2, 1, 16, CAST(N'2023-10-29T01:55:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (25, 25, 15, 1, 2, 16, CAST(N'2023-10-29T01:55:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (26, 25, 15, 2, 1, 17, CAST(N'2023-10-29T01:56:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (27, 25, 15, 1, 2, 17, CAST(N'2023-10-29T01:56:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (29, 80, 100, 1, 1, 18, CAST(N'2023-10-29T02:31:00.000' AS DateTime))
INSERT [dbo].[ProductDetails] ([id], [price], [quantity], [size], [color], [product], [createdDate]) VALUES (30, 70, 80, 1, 2, 18, CAST(N'2023-10-29T02:31:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[ProductDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (1, N'Sản phẩm A', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbSULnqN88LvkkuFppEy8nNvSAYQwZD8x6Q&usqp=CAU', 1, N'', CAST(N'2023-10-28T17:52:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (2, N'Sản phẩm B', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T17:52:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (3, N'Sản phẩm C', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:07:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (4, N'Sản phẩm D', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:09:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (5, N'Sản phẩm E', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:09:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (6, N'Sản phẩm F', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:10:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (7, N'Sản phẩm G', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:13:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (8, N'Sản phẩm H', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:29:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (9, N'Sản phẩm I', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-28T18:32:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (12, N'Sản phẩm L', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:47:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (13, N'Sản phẩm K', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:49:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (14, N'Sản phẩm M', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:53:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (15, N'Sản phẩm N', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:55:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (16, N'Sản phẩm O', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:55:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (17, N'Sản phẩm P', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 1, N'', CAST(N'2023-10-29T01:56:00.000' AS DateTime), 1)
INSERT [dbo].[Products] ([id], [name], [image], [category], [description], [createdDate], [status]) VALUES (18, N'Sản phẩm Z', N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media', 3, N'', CAST(N'2023-10-29T02:31:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[Sizes] ON 

INSERT [dbo].[Sizes] ([id], [size], [description], [status], [createdDate]) VALUES (1, 24, N'test', 1, CAST(N'2023-10-28T15:58:00.000' AS DateTime))
INSERT [dbo].[Sizes] ([id], [size], [description], [status], [createdDate]) VALUES (2, 25, N'test2', 1, CAST(N'2023-10-29T01:32:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sizes] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [firstName], [lastName], [username], [password], [email], [phoneNumber], [address], [createdDate], [avatar], [status], [checkAll], [role]) VALUES (3, N'pham', N'kiem', N'admin', N'$2a$12$d8OvAJFR3UZV6.bHXTv6SeZL1V5foX8UqyZIly/rGOmAzAk84G03O', N'kiem@gmail.com', N'', N'', CAST(N'2023-10-28T02:03:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-avatar.png?alt=media', 1, 1, 1)
INSERT [dbo].[Users] ([id], [firstName], [lastName], [username], [password], [email], [phoneNumber], [address], [createdDate], [avatar], [status], [checkAll], [role]) VALUES (7, N'pham', N'kiem', N'kiem', N'$2a$12$yVEYJM/wO7HLf3TPFZrn2upSWX.r5x7rlPP9q2XV7xejNwGoV7XAC', N'admin@gmail.com', N'0382738187', N'17AB', CAST(N'2023-10-28T02:47:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-avatar.png?alt=media', 1, 1, 2)
INSERT [dbo].[Users] ([id], [firstName], [lastName], [username], [password], [email], [phoneNumber], [address], [createdDate], [avatar], [status], [checkAll], [role]) VALUES (12, N'kiem', N'pham', N'kiempham', N'$2a$12$i1RzPX/jlBqDUctYwmGO5O2u0DJgFfWl.9oN1hwizEqCWbySNgIzK', NULL, NULL, NULL, CAST(N'2023-10-28T21:44:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-avatar.png?alt=media', 1, 1, 2)
INSERT [dbo].[Users] ([id], [firstName], [lastName], [username], [password], [email], [phoneNumber], [address], [createdDate], [avatar], [status], [checkAll], [role]) VALUES (13, N'Nguyen', N'Khoi', N'khoi', N'$2a$12$tS4.aUg1aGBQrafI04uWxuzr24Z8nzDKYVumBB6YL20mReqmdAwBi', N'khoi@gmail.com', N'03939393939', N'', CAST(N'2023-10-29T01:09:00.000' AS DateTime), N'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg', 1, 1, 2)
INSERT [dbo].[Users] ([id], [firstName], [lastName], [username], [password], [email], [phoneNumber], [address], [createdDate], [avatar], [status], [checkAll], [role]) VALUES (14, N'Nguyen', N'Khoi', N'khoinguyen', N'$2a$12$fulfDElv0zBELs8Vga0rOuW15gn6SUNTyiASnprgMMMGG3Kqe7mhu', N'khoi@gmail.com', N'03939393939', N'', CAST(N'2023-10-29T01:15:00.000' AS DateTime), N'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg', 1, 1, 2)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Categories] ADD  CONSTRAINT [DF_Categories_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Colors] ADD  CONSTRAINT [DF_Colors_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[OrderDetailInCarts] ADD  CONSTRAINT [DF_Table_1_check]  DEFAULT ((1)) FOR [check]
GO
ALTER TABLE [dbo].[OrderDetailInCarts] ADD  CONSTRAINT [DF_OrderDetailInCart_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_status]  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_image]  DEFAULT ('https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-product.jpg?alt=media') FOR [image]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Sizes] ADD  CONSTRAINT [DF_Sized_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_avatar]  DEFAULT ('https://firebasestorage.googleapis.com/v0/b/shoeshop-e5f23.appspot.com/o/default-avatar.png?alt=media') FOR [avatar]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_checkAll]  DEFAULT ((1)) FOR [checkAll]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_role]  DEFAULT ((2)) FOR [role]
GO
USE [master]
GO
ALTER DATABASE [SportShop] SET  READ_WRITE 
GO
