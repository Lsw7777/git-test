var app = new Vue({
  el: "#app",
  data: {
    // 变量区
    darkModel: null,
    adaptCss: false,
    tipShow: false, //警告提示是否显示
    isShow: false, //蓝牙连接失败提示
    imgShow1: true, //连接中loading显示
    imgShow2: false, //重新连接文字显示
    notClick: "",
    middleShow: false,
    // 文字区
    textSwitch: "连接中",
    reconnect: "重新连接", //连接失败文字
    currentLanguage: "zh-CN",
    confirmTiming: "确定",
    cancelTiming: "取消",
    defeatText:
      "请尝试以下操作： <br> 1.请确认设备电量充足，并处开启状态 <br> 2.将设备靠近要连接的手机(10米以内)",
    defeatTitle: "连接失败", //失败标题
    defeatCancel: "稍后再试",
    defeatConfirm: "重新连接",
    tipsOne: "设备故障，请检查设备",
    // 图片地址
    tipImg: "", //警告提示图片
    loadingImg: "./image/loading.png",
    buttonImg: "./image/standby.png",
    notClick: "opacity: 0.4;pointer-events: none;margin: 12px 12px 0px 12px;",
    // pad折叠屏的适配
    popupWidth: "width:266px",
    cardOneMargin: "margin: 10px 12px 0px 12px;",
    tipsMargin: "left: 12px;right: 12px;",
    // 项目独有
  },
  created() {},
  methods: {
    initialization() {
      //初始化函数
    },
    dark() {
      this.darkModel = "./css/dark.css";
      this.buttonImg = "./image/standbyDark.png";
    },
    tipsFun(id) {
      if (id) {
        if (document.body.clientWidth > 500) {
          this.$refs.marginTop.style.margin = "48px 0 0 0";
        } else {
          this.$refs.marginTop.style.margin = "1.2rem 0 0 0";
        }
        this.tipShow = true;
      } else {
        this.tipShow = false;
        this.$refs.marginTop.style.margin = "";
      }
    },
    reconnection() {
      openOrClose();
      this.isShow = false;
      //蓝牙重新连接按钮
    },
    languageSelect() {
      if (this.currentLanguage !== "zh-CN") {
        this.textSwitch = "Connecting";
        this.timingText = "Countdown off";
        this.confirmTiming = "Confirm";
        this.cancelTiming = "Cancel";
        this.tipsOne = "Equipment error, please check";
        this.defeatTitle = "Bluetooth connection failed";
        this.defeatConfirm = "Reconnection";
        this.defeatCancel = "Try again later";
        this.defeatText =
          "Try the following： <br> 1.Please confirm that the equipment is powered on <br> \
                2.Place the device close to the phone to be connected (within 10 meters)";
        // -----------------------项目独有区域-----------------------------------------
      }
    },
  },
});
// --------------------------------------------------------hilinkJS区---------------------------------------------------------------------------------------
// 蓝牙变量区-----------------------------------------------------------------------------------------------------------------------------------------------
let deviceId = "",
  isConnect = false,
  bluetoothOpen = true,
  currentLanguage = "zh-CN",
  isIOS = true,
  isDark,
  notifyGetData = [],
  isOpen = false,
  bleCountNum = 0,
  timer1;

// --------------------------------------------蓝牙返回值区域------------------------------------------------------------------------
// function backValue(data) {
//   document.getElementById("log1").innerHTML = data;
//   let effectiveData;
//   if (data.length == 37) {
//     effectiveData = data.slice(12, 25);
//     document.getElementById("log1").innerHTML = effectiveData;
//     effectiveData[0] == 1 ? uiShow(4) : uiShow(3);
//   }
// }

// --------------------------------------------------------------ui界面设置区域----------------------------------------------------------------------------------
//1为连接中  2为未连接  3为待机  4为工作中
function uiShow(id) {
  switch (id) {
    case 1:
      app.initialization();
      isConnect = false;
      isOpen = false;
      app.tipShow = false;
      // 点击事件开启vue界面连接中状态
      // 蓝牙未连接提示关闭
      app.isShow = false;
      app.imgShow1 = true;
      app.imgShow2 = false;
      if (600 < document.body.clientWidth && document.body.clientWidth < 670) {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 24px 0px 24px;";
      } else {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 12px 0px 12px;";
      }
      if (currentLanguage !== "zh-CN") {
        app.textSwitch = "Connecting";
        app.reconnect = "Relink";
      } else {
        app.textSwitch = "连接中";
      }
      break;
    case 2:
      app.initialization();
      isConnect = false;
      isOpen = false;
      isRight = false;
      app.tipShow = false;
      // 未连接状态
      app.imgShow1 = false;
      app.imgShow2 = false;
      if (600 < document.body.clientWidth && document.body.clientWidth < 670) {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 24px 0px 24px;";
      } else {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 12px 0px 12px;";
      }
      if (currentLanguage !== "zh-CN") {
        (app.textSwitch = "Disconnect"), (app.reconnect = "Relink");
      } else {
        app.textSwitch = "未连接";
        app.reconnect = "重新连接";
      }
      break;
    case 3:
      // 待机状态
      app.initialization();
      isConnect = true;
      isOpen = false;
      // 蓝牙未连接提示关闭
      app.isShow = false;
      app.imgShow1 = false;
      app.imgShow2 = true;
      if (600 < document.body.clientWidth && document.body.clientWidth < 670) {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 24px 0px 24px;";
      } else {
        app.notClick = "opacity: 0.38;pointer-events: none;margin: 12px 12px 0px 12px;";
      }
      if (currentLanguage !== "zh-CN") {
        app.textSwitch = "Standby";
      } else {
        app.textSwitch = "待机";
      }
      if (isDark) {
        app.buttonImg = "./image/standbyDark.png";
      } else {
        app.buttonImg = "./image/standby.png";
      }
      break;
    case 4:
      // 工作中状态
      isConnect = true;
      isOpen = true;
      // 蓝牙未连接提示关闭
      app.isShow = false;
      app.imgShow1 = false;
      app.imgShow2 = true;
      if (600 < document.body.clientWidth && document.body.clientWidth < 670) {
        app.notClick = "margin: 12px 24px 0px 24px;";
      } else {
        app.notClick = "margin: 12px 12px 0px 12px;";
      }
      if (currentLanguage !== "zh-CN") {
        app.textSwitch = "Working";
      } else {
        app.textSwitch = "工作中";
      }
      if (isDark) {
        app.buttonImg = "./image/openDark.png";
      } else {
        app.buttonImg = "./image/open.png";
      }
      break;
  }
}

// ------------------------------------------------------------ui界面相关结束-------------------------------------------------------------------------------------------------

function start() {
  const screenWidth = document.body.clientWidth;
  const width = screenWidth / 2 - 27;
  app.popupWidth = `width:${width}px`;
  if (document.body.clientWidth > 500) {
    app.adaptCss = true;
  } else {
    app.adaptCss = false;
  }
  if (600 < document.body.clientWidth && document.body.clientWidth < 670) {
    app.notClick = "opacity: 0.4;pointer-events: none;margin: 12px 24px 0px 24px;";
    app.cardOneMargin = "margin: 10px 24px 0px 24px;";
    app.tipsMargin = "left: 24px;right: 24px;";
  } else {
    app.notClick = "opacity: 0.4;pointer-events: none;margin: 12px 12px 0px 12px;";
  }
  setInterval(() => {
    if (screenWidth != document.body.clientWidth) {
      window.location.reload();
    }
  }, 500);

  setDarkMode();
  getSystemInfo();
  hilink.onBLEConnectionStateChange("onBLEConnectionStateChangeCallBack");
  hilink.getBluetoothAdapterState("bluetoothCallBack");
  hilink.onBluetoothAdapterStateChange("bluetoothCallBack");
  currentLanguage = getAppLanguage();
  app.currentLanguage = currentLanguage;
  app.languageSelect();
}

function reConnectFun() {
  hilink.getBluetoothAdapterState("bluetoothCallBack");
  hilink.onBluetoothAdapterStateChange("bluetoothCallBack");
  hilink.onBluetoothAdapterStateChange("bluetoothCallBack");
}

// 修改区---------------------------------------------------------------------------------------------------------------------------------------------------------------
function getSystemInfo() {
  window.getSystemInfoSyncCallBack = (info) => {
    let data = JSON.parse(info);
    if (data.platform == "iOS") {
      isIOS = true;
    } else {
      isIOS = false;
    }
  };
  window.hilink.getSystemInfoSync("getSystemInfoSyncCallBack");
}

function setDarkMode() {
  try {
    isDark = window.hilink.getDarkMode() === 2;
  } catch (error) {}
  if (isDark) {
    // 暗黑模式
    hilink.modifyTitleBar(true, "0", "baseCallBack");
    hilink.changeTitleStyle(2);
    app.dark();
  } else {
    hilink.modifyTitleBar(false, "0", "baseCallBack");
    hilink.changeTitleStyle(2);
    //   白天白色模式
  }
}
// 修改区---------------------------------------------------------------------------------------------------------------------------------------------------------------
function getIOSdevices() {
  window["onBluetoothDeviceFoundCallBack"] = (info) => {
    let data = JSON.parse(info);
    if (getMAC(data) == deviceId) {
      deviceId = data.deviceId;
      hilink.stopBluetoothDevicesDiscovery();
      hilink.createBLEConnection(deviceId);
    }
  };
  hilink.onBluetoothDeviceFound("onBluetoothDeviceFoundCallBack");
  hilink.startBluetoothDevicesDiscovery([], false, 1);
}

// 修改区---------------------------------------------------------------------------------------------------------------------------------------------------------------
function getMAC(data) {
  //0 未扫描到设备, 1 匹配到设备, 2匹配到设备没有mac地址
  if (data.advertisData.length > 0) {
    let manufacturerData = data.advertisData;
    manufacturerData = data.advertisData.replace(/ /g, "");
    manufacturerData = manufacturerData
      .slice(manufacturerData.length - 13, manufacturerData.length - 1)
      .toLocaleUpperCase();
    return formatMac(manufacturerData);
  }
}

function getAppLanguage() {
  // 判定规则:如果不是以'zh-'开始则显示为en-US
  let language,
    defualtLanguage = "zh-CN";
  // let language = window.hilink.getAppLanguage();
  let reg = /^zh-/i;
  if (navigator && navigator.language) {
    language = reg.test(navigator.language) ? defualtLanguage : "en-US";
  } else {
    language = defualtLanguage;
  }
  return language;
}

// 修改区---------------------------------------------------------------------------------------------------------------------------------------------------------------

// 修改区---------------------------------------------------------------------------------------------------------------------------------------------------------------

function bluetoothCallBack(result) {
  clearTimeout(timer1);
  bluetoothOpen = JSON.parse(result).available;
  if (bluetoothOpen) {
    hilink.getCurrentRegisteredDevice("getCurrentRegisteredDeviceCallBack");
    timer1 = setTimeout(() => {
      if (!isConnect) {
        app.isShow = true;
        uiShow(2);
        //蓝牙未连接提示区
      }
    }, 60000);
  } else {
    //    蓝牙未开启开启蓝牙接口
    hilink.openBluetoothAdapter();
    timer1 = setTimeout(() => {
      if (!isConnect) {
        uiShow(2);
        //60秒后蓝牙未连接提示区
        app.isShow = true;
      }
    }, 60000);
  }
}

// 修改区------------------------------------------------------------------------------------------------------------------------------------------------

var isRight = false;
function onBLEConnectionStateChangeCallBack(result) {
  isConnect = JSON.parse(result).connected;
  if (isConnect) {
    isRight = true;
  }
  // document.getElementById('log1').innerHTML = isConnect + '触发了'
  if (!isConnect && isRight) {
    uiShow(1);
    hilink.getBluetoothAdapterState("bluetoothCallBack");
    getCurrentRegisteredDeviceCallBack();
    isRight = false;
  } else {
    setTimeout(keepConnect, 2000);
    setTimeout(writeCheckDevice, 3700);
    // setTimeout(notifyData, 1300);
    setInterval(read, 1300);
  }
}

function getCurrentRegisteredDeviceCallBack(result) {
  deviceId = JSON.parse(result).deviceId;
  if (isIOS) {
    getIOSdevices();
  } else {
    hilink.createBLEConnection(deviceId);
  }
}

// ----------------------------------------点击事件--------------------------------------------------------------------------------------------------------

function openOrClose() {
  if (isConnect) {
    if (isOpen) {
      writeStop();
    } else {
      writeStart();
    }
  } else {
    reConnectFun();
    uiShow(1);
  }
}
// <!-- 指令区域 ----------------------------------------------------------------------------------------------------------------------------------------------------------->
// <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
// <!-- 指令区域----------------------------------------------------------------------------------------------------------------------------------------------------------->
// <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
// <!-- 指令区域----------------------------------------------------------------------------------------------------------------------------------------------------------->
// <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->

// 开始指令
function writeStart() {
  var data = [];
  data.push(0x03 & 0xff);
  data.push(0x04 & 0xff);
  data.push(0x01 & 0xff);
  data.push(0x01 & 0xff);
  data.push(0x00 & 0xff);
  data.push(30 & 0xff);
  data.push(0x01 & 0xff);
  writeControl(bytes2Str(data));
}

// 停止指令
function writeStop() {
  var data = [];
  data.push(0x03 & 0xff);
  data.push(0x01 & 0xff);
  data.push(0x02 & 0xff);
  data.push(0x01 & 0xff);
  writeControl(bytes2Str(data));
}
function writeSpeed(id) {
  var data = [];
  data.push(0x03 & 0xff);
  data.push(0x04 & 0xff);
  data.push(0x04 & 0xff);
  data.push(speed & 0xff);
  data.push(0x01 & 0xff);
  data.push(0x01 & 0xff);
  data.push(0x01 & 0xff);
  writeControl(bytes2Str(data));
}
// -------------------------------------------------------------------蓝牙指令区-------------------------------------------------------------------------------

function keepConnect() {
  var data = [];
  data.push(0x55 & 0xff);
  hilink.writeBLECharacteristicValue(
    deviceId,
    "E54EAA30-371B-476C-99A3-74D267E3EDAE",
    "E54EAA33-371B-476C-99A3-74D267E3EDAE",
    bytes2Str(data),
    "searchCallback"
  );
}

function searchCallback(result) {
  read();
}

function read() {
  hilink.readBLECharacteristicValue(
    deviceId,
    "E54EAA30-371B-476C-99A3-74D267E3EDAE",
    "E54EAA35-371B-476C-99A3-74D267E3EDAE",
    "readCallBack"
  );
}

function readCallBack(result) {
  var data = encodeRead(JSON.parse(result).data);
  document.getElementById("log1").innerHTML = data;
  data[2] == 2 ? uiShow(4) : uiShow(3);
}

// 不可删除
function writeCheckDevice() {
  // document.getElementById("log2").innerHTML = "检测命令" + csml;
  var realData = [0, 0, 0];
  var data = ble_msg_packet_up(realData, bleCountNum);
  writeControl(bytes2Str(data));
}

function writeControl(data) {
  bleCountNum++;
  window.hilink.writeBLECharacteristicValue(
    deviceId,
    "E54EAA30-371B-476C-99A3-74D267E3EDAE",
    "E54EAA34-371B-476C-99A3-74D267E3EDAE",
    data,
    "writeCallBack"
  );
}

// function notifyData() {
//   var notifyState;
//   hilink.onBLECharacteristicValueChange("notifyCallBack");
//   if (!isIOS) {
//     window.hilink.setEnableIndication(false);
//   }
//   notifyState = window.hilink.notifyBLECharacteristicValueChange(
//     deviceId,
//     "E54EAA30-371B-476C-99A3-74D267E3EDAE",
//     "E54EAA35-371B-476C-99A3-74D267E3EDAE",
//     true
//   );
//   if (notifyState !== 0) {
//     setTimeout(notifyData, 50);
//   }
// }

// function notifyCallBack(result) {
//   var receiveDate = strToHexCharCode(JSON.parse(result).data);
//   if (receiveDate.length > 3) {
//     if (receiveDate[9] === 129) {
//       deviceErrorUI();
//     } else if (receiveDate[0] === 13 && receiveDate[1] === 10) {
//       backValue(notifyGetData);
//       notifyGetData = [];
//       for (let i = 0; i < receiveDate.length; i++) {
//         notifyGetData.push(receiveDate[i]);
//       }
//     } else {
//       for (let i = 0; i < receiveDate.length; i++) {
//         notifyGetData.push(receiveDate[i]);
//       }
//     }
//   }
// }

// ------------------------------------------------------------------------------蓝牙设置区域结束-----------------------------------------------------------------------------

// -------------------------------------------------------------------工具内容------------------------------------------------------------------------------------------------------
function bytes2Str(arr) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i].toString(16);
    if (tmp.length === 1) {
      tmp = "0" + tmp;
    }
    str += tmp;
  }
  return str;
}

function strToHexCharCode(str) {
  var pos = 0;
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  var hexA = new Array();
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);
    var v = parseInt(s, 16);
    hexA.push(v);
    pos += 2;
  }
  return hexA;
}

(function () {
  var table =
    "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
  /* Number */
  fun_crc32 = function (/* Array */ msg, /* Number */ crc) {
    if (crc == window.undefined) crc = 0;
    var n = 0; //a number between 0 and 255
    var x = 0; //an hex number
    crc = crc ^ -1;
    for (var i = 0, iTop = msg.length; i < iTop; i++) {
      n = (crc ^ msg[i]) & 0xff;
      x = "0x" + table.substr(n * 9, 8);
      crc = (crc >>> 8) ^ x;
    }
    return crc ^ -1;
  };
  ble_msg_packet_up = function (msg, number) {
    var crc32;
    var i, j;
    var Head = 0x0d0a;
    var Version = 0x01;
    var LEN = msg.length;
    var a = new Array(msg.length + 9);
    var tmp_a = new Array(msg.length + 4);
    a[0] = (Head >>> 8) & 0xff;
    a[1] = Head & 0xff;
    a[2] = Version;
    a[3] = (LEN >>> 8) & 0xff;
    a[4] = LEN & 0xff;
    for (i = 5, j = 0; j < msg.length; i++, j++) {
      a[i] = msg[j];
      tmp_a[j] = msg[j];
    }
    msg[j++] = a[i++] = (number >>> 24) & 0xff;
    msg[j++] = a[i++] = (number >>> 16) & 0xff;
    msg[j++] = a[i++] = (number >>> 8) & 0xff;
    msg[j++] = a[i++] = number & 0xff;
    crc32 = fun_crc32(msg);
    a[i++] = (crc32 >>> 24) & 0xff;
    a[i++] = (crc32 >>> 16) & 0xff;
    a[i++] = (crc32 >>> 8) & 0xff;
    a[i++] = crc32 & 0xff;
    return a;
  };
})();

function formatMac(str) {
  str = str.slice(0, 6) + str.slice(-6);
  str = this.hexArarryAddSpace(str, 2);
  let arr = str.split(" ");
  arr.reverse();
  let result = "";
  arr.map((item) => {
    result += item + ":";
  });
  result = result.slice(0, result.length - 1);
  return result;
}

function hexArarryAddSpace(str, split_len = 2) {
  /** 16进制字符串 每2个字符用一个空格隔开 **/
  let result = "";
  for (let i = 0; i < str.length; i += split_len) {
    if (result !== "") result += " ";
    result += str[i] + str[i + 1];
  }
  return result;
}
function encodeRead(str) {
  var result2 = strToHexCharCode(str);

  var result3 = [];
  for (let i = 0; i < result2.length; i++) {
    result3[i] = result2[i] ^ 0x33;
  }
  return result3;
}
