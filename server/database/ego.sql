/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : ego

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 10/11/2022 17:35:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NULL DEFAULT NULL,
  `name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `cid` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '家用电器', 1001);
INSERT INTO `category` VALUES (1, '手机/运营商/数码', 1002);
INSERT INTO `category` VALUES (1, '电脑/办公', 1003);
INSERT INTO `category` VALUES (1, '家具/家居', 1004);
INSERT INTO `category` VALUES (1001, '电视', 10001);
INSERT INTO `category` VALUES (1001, '空调', 10002);
INSERT INTO `category` VALUES (1001, '洗衣机', 10003);
INSERT INTO `category` VALUES (1001, '冰箱', 10004);
INSERT INTO `category` VALUES (1002, '手机通讯', 10001);
INSERT INTO `category` VALUES (1002, '运营商', 10002);
INSERT INTO `category` VALUES (1002, '摄影', 10003);
INSERT INTO `category` VALUES (1002, '摄像', 10004);
INSERT INTO `category` VALUES (1003, '电脑整机', 10001);
INSERT INTO `category` VALUES (1003, '电脑配件', 10002);
INSERT INTO `category` VALUES (1003, '外设产品', 10003);
INSERT INTO `category` VALUES (1003, '游戏设备', 10004);
INSERT INTO `category` VALUES (1004, '厨具', 10001);
INSERT INTO `category` VALUES (1004, '家纺', 10002);
INSERT INTO `category` VALUES (1004, '灯具', 10003);
INSERT INTO `category` VALUES (1004, '家具', 10004);
INSERT INTO `category` VALUES (10001, '超薄点视', 100001);
INSERT INTO `category` VALUES (10001, '全面屏点视', 100002);

-- ----------------------------
-- Table structure for content
-- ----------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content`  (
  `id` int NULL DEFAULT NULL,
  `name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pid` int NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of content
-- ----------------------------
INSERT INTO `content` VALUES (1, '广告分类', 1001);
INSERT INTO `content` VALUES (1001, 'banner广告', 10001);
INSERT INTO `content` VALUES (1001, '直播代购', 10002);
INSERT INTO `content` VALUES (19412, '刚刚赚了很多钱', 89602);
INSERT INTO `content` VALUES (7231, '嘎嘎嘎', 834);

-- ----------------------------
-- Table structure for contentinfo
-- ----------------------------
DROP TABLE IF EXISTS `contentinfo`;
CREATE TABLE `contentinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int NOT NULL,
  `name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `url` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of contentinfo
-- ----------------------------
INSERT INTO `contentinfo` VALUES (1, 10001, 'OPPO Watch', 'https://pro.jd.com/mall/active/tG3nBBhghqhfM69HoJw9ZoDaT7d/index.html?extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjg5YzRjMTUyLWUwZjktNGQ0OC05NDI4LTJhODQ4NWJjNTc1N1wiLFwibWF0ZXJpYWxfaWRcIjpcIjE4NTAxMDcyMjlcIixcInBvc19pZFwiOlwiNDI3MlwiLFwic2lkXCI6XCJmODcwZmM2MS1jYjc3LTQwN2UtOTM1ZC1jYzhlZTc0MTYyZTdcIn0ifQ==&jd_pop=89c4c152-e0f9-4d48-9428-2a8485bc5757&abt=1', '//img14.360buyimg.com/pop/s1180x940_jfs/t1/110562/14/10737/42247/5e81bb76E6fffa006/b3f703f750bd37ea.jpg.webp');
INSERT INTO `contentinfo` VALUES (3, 90410, '椅子', 'https://channel-m.jd.com/pc/psp/10979325649?imup=CgwKBnd3dGxpdRIAGAASEAjR7azzKBDmZhoAIJpNKAEYsRsgACoUaWwsdWEseGdiLGdhLGNpYSxiYWEyAmlsOioKCWpkX2hiZHl5MRDnYRgCIJL50ty1x-S1dyjCo6Q3MMGjpDc4E0CAgCA&extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcIjJiNmEyNjE5LWE4MmItNGMyNi1iYzYwLWI3ZGE1NzljOWRkZVwiLFwibWF0ZXJpYWxfaWRcIjpcIjg2MDUxMzIyOTY2NTg2NjQ1OTRcIixcInBvc19pZFwiOlwiMzUwNVwiLFwic2lkXCI6XCJmN2Y5ODM2ZS0yZTViLTQyMTUtYWNiMi04NDdmZmI2N2U2ZDdcIn0ifQ==&jd_pop=2b6a2619-a82b-4c26-bc60-b7da579c9dde&abt=0', 'https://img12.360buyimg.com/pop/s1180x940_jfs/t1/117573/18/9029/83238/5ed7c92aE789977c2/b11a288a7284cdfe.jpg.webp');
INSERT INTO `contentinfo` VALUES (4, 10002, '123', '123', '123');
INSERT INTO `contentinfo` VALUES (7, 10002, '555', '55', '55');

-- ----------------------------
-- Table structure for params
-- ----------------------------
DROP TABLE IF EXISTS `params`;
CREATE TABLE `params`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemCatId` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `paramData` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10020 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of params
-- ----------------------------
INSERT INTO `params` VALUES (10015, '100001', '[{\"value\":\"端口参数\",\"children\":[{\"childValue\":\"USB2.0接口\",\"value\":\"3\"},{\"childValue\":\"HDMI2.0接口\",\"value\":\"2\"}]},{\"value\":\"USB支持格式\",\"children\":[{\"childValue\":\"USB支持音频格式\",\"value\":\"aac.flac.mp3.wav\"},{\"childValue\":\"USB支持图片格式\",\"value\":\"JPEG/PNG/BMP\"},{\"childValue\":\"USB支持视频格式\",\"value\":\".avi .mpg .ts .mkv .mp4 .flv .mov .rm .rmvb\"}]}]');
INSERT INTO `params` VALUES (10017, '10003', '[{\"value\":\"显示器\",\"children\":[{\"childValue\":\"屏幕类型\",\"value\":\"\"},{\"childValue\":\"屏幕尺寸\",\"value\":\"\"},{\"childValue\":\"物理分辨率\",\"value\":\"\"},{\"childValue\":\"显示比例\",\"value\":\"\"}]},{\"value\":\"机器规格\",\"children\":[{\"childValue\":\"产品尺寸（mm）\",\"value\":\"\"},{\"childValue\":\"产品净重（kg）\",\"value\":\"\"}]},{\"value\":\"内存\",\"children\":[{\"childValue\":\"插槽数量\",\"value\":\"\"}]}]');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sellPoint` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cid` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `num` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `barcode` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `updated` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descs` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10058 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (10053, '格力空调', 'http://localhost:3005/1668071401832.webp', '外观精美，抗菌功能', '998', '10002', '4', '', '1', '', '', '<p>123</p>');
INSERT INTO `project` VALUES (10054, '华为mate 50 pro', 'http://localhost:3005/1668071620660.webp', '首款搭载超光变XMAGE影像的华为手机', '4399', '10001', '14', '', '1', '', '', '<p>很好用</p>');
INSERT INTO `project` VALUES (10055, '联想拯救者 Y7000', 'http://localhost:3005/1668071779779.jpg', '联想拯救者Y7000游戏本系列采用三面窄边框设计，配备15.6英寸1080P屏幕，屏占比84%，可选高色域版；搭载酷睿八代标压处理器，英伟达GTX1050系列显卡。', '5600', '10001', '15', '', '1', '', '', '<p>值得一试</p>');
INSERT INTO `project` VALUES (10057, '海尔电视', 'http://localhost:3005/1668072144635.webp', '坚固耐用', '2300', '10001', '5', '', '1', '', '', '<p><em>海尔电视</em>不仅有着能够满足追剧需求的智慧观影场景、实现远程教育的智慧教育场景、畅享云游戏的智慧娱乐场景,还有着智慧互联场景<br/></p>');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (13, 'test', '$2a$10$ows/1UOsYYmb2/f/VHcs/ulNUUJPxTrvTTqYEdtUV6W8KXcblo1HK', '123@qq.com');
INSERT INTO `user` VALUES (14, 'admin', '$2a$10$5vWQaFIa59W6Cqgx.iYa5elclg8ScRCG.gmoNnHExbGEkMAzaF2/y', '123@qq.com');

SET FOREIGN_KEY_CHECKS = 1;
