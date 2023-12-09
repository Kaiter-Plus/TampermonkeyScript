## 前言

### 支持作者

![支付宝](https://greasyfork.s3.us-east-2.amazonaws.com/lg94h87tgo1nuetf5n2fuhvloa2s)
<img src="https://greasyfork.s3.us-east-2.amazonaws.com/svemz9wsqdw7ym25wnwarww7jwit" alt="微信" title="微信" width="200" />

### 所有脚本开源地址，欢迎 star ⭐

- gitee：[https://gitee.com/Kaiter-Plus/TampermonkeyScript](https://gitee.com/Kaiter-Plus/TampermonkeyScript)
- github：[https://github.com/Kaiter-Plus/TampermonkeyScript](https://github.com/Kaiter-Plus/TampermonkeyScript)

## 1 脚本介绍

- 给虎牙直播视频界面的功能栏添加一些额外的功能
- 脚本配置选项位置（页面右下角）  
  ![脚本配置选项位置](https://greasyfork.org/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOTUwQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1982585de8204c148489d317f8892a82f3236f82/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFISWFRSEkiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e4f27e4605e5535222e2c2f9dcbe36f4bd1deb29/image.png?locale=zh-CN)

## 2 已添加的功能

### 2.1 时间同步

- 直接同步直播时间到最新的缓存时间(由于虎牙视频播放器更新，目前无法使用)

### 2.2 镜像画面

- 180° 翻转直播界面

### 2.3 自动选择最高画质

- 自动选择最高画质
  - 默认关闭，可在配置选项里面打开

### 2.4 自动领取百宝箱奖励

- 自动领取观看直播时长的（6 个）百宝箱奖励
  - 默认关闭，可在配置选项里面打开

### 2.4 自动网页全屏

- 自动进入网页全屏模式
  - 默认关闭，可在配置选项里面打开
  - 已知 bug
  1. 不可以按 esc 退出，只能点击 退出剧场模式 按钮退出

## 3 更新日志

- 2023/10/10 修复领取百宝箱失效的问题
- 2022/11/29 重构脚本
- 2022/11/02 修复脚本无法正常加载的 bug
- 2021/12/20 修复退出网页全屏需自动刷新才能正常使用的 bug
- 2021/06/12 虎牙网站更新，再次修复脚本失效
- 2021/05/25 虎牙网站更新，修复脚本失效
- 2021/03/22 添加 “自动网页全屏” 功能，并同时提供配置开关，默认关闭
- 2021/03/13 优化自动领取百宝箱逻辑
- 2021/03/12 添加了脚本的配置选项
- 2021/03/10 紧急修复了宝箱不会领取的 bug
- 2021/03/08 修复了最后两个宝箱不会领取的 bug
- 2021/03/04 修复了一个小 bug
- 2021/03/03 修改 更改配置时为不用重载界面
- 2021/03/02 添加 “自动选领取百宝箱奖励” 功能，并同时提供配置开关，默认关闭
- 2021/03/01 添加 “自动选择最高画质” 功能，并同时提供配置开关，默认关闭
- 2021/01/29 代码重构
- 2020/12/28 添加 “画面镜像” 功能
- 2020/12/10 添加 “同步时间” 功能
