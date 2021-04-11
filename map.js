    var getlocset = document.getElementById('getloc')
    var map_div = document.getElementById('map')
    var buttomset = document.getElementById("mapshow");
    var pic = document.getElementById("picture")
    var setfbl = document.getElementById("fedbacklog1")
    var setfbl2 = document.getElementById("fedbacklog2")
    var coordinate = 0;
    var hidden = 1;
    var global_latitude = 0
    var global_longitude = 0
    var global_latitude1 = 0
    var global_longitude1 = 0
    var studentId = 0
    var road = []
    var pcnum = 0

    document.write("<link rel='stylesheet' type='text/css' href='style.css?v=" + new Date().getTime() + "'>");

    $(function() {              
        $.ajax({
            type: "GET", //请求方式
            url: "roads.json", //地址，就是json文件的请求路径
            dataType: "json", //数据类型可以为 text xml json  script  jsonp
            //async: false,
            success: function(data) { //返回的参数就是 action里面所有的有get和set方法的参数
                road = data
            }
        });
    })


    function openAndCloseMap() {
        if (hidden == 1) {
            showMap()
            map.style.display = ""
            buttomset.innerText = '关闭定位地图'
            hidden = 0


        } else if (hidden == 0) {
            map.style.display = 'none'
            buttomset.innerText = '在地图上展示当前位置'
            hidden = 1
        } else {
            alert("some mistake")
        }

    }

    //定位   
    function getLocation() {


        getlocset.innerHTML = '正在定位中，请稍等片刻。。。';

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000
        }

        if (navigator.geolocation) {
            //浏览器支持geolocation
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        } else {
            //浏览器不支持geolocation
            alert('浏览器不支持GeoLocation!');
        }
    }

    function toAnother() {

        if (coordinate == 0) {
            coordinate = 1
        } else {
            coordinate = 0
        }

        if (global_latitude1 == 0 && global_longitude1 == 0) {
            var tranformed = transformCoordinate(global_longitude, global_latitude)
            let longitude = tranformed.j
            let latitude = tranformed.w
            global_longitude1 = longitude
            global_latitude1 = latitude
        }
        showMap()
    }

    function transformCoordinate(lng, lat) {

        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * Math.PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return {
            j: lng * 2 - mglng,
            w: lat * 2 - mglat
        };

    }

    var transformlat = function transformlat(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
        return ret
    };

    var transformlng = function transformlng(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ret
    };

    //生成地图
    function showMap() {

        if (coordinate == 0) {
            var lon = global_longitude
            var lat = global_latitude
        } else {
            var lon = global_longitude1
            var lat = global_latitude1
        }
        var geopoint = new BMapGL.Point(lon, lat);
        var centpoint = BMapGL.Point(121.511798, 30.839075)

        //地图初始化
        var bm = new BMapGL.Map("mapcontainer");
        bm.centerAndZoom(centpoint, 18);
        bm.addControl(new BMapGL.ZoomControl());

        //坐标转换完之后的回调函数
        translateCallback = function(data) {
            if (data.status === 0) {
                var marker = new BMapGL.Marker(data.points[0]);
                bm.addOverlay(marker);
                var label = new BMapGL.Label("您所在的位置", {
                    offset: new BMapGL.Size(10, -10)
                });
                marker.setLabel(label); //添加百度label
                bm.setCenter(data.points[0]);
            }
        }

        setTimeout(function() {
            var convertor = new BMapGL.Convertor();
            var pointArr = [];
            pointArr.push(geopoint);
            convertor.translate(pointArr, COORDINATES_WGS84, COORDINATES_BD09, translateCallback)
        }, 1000);
    }

    // 获取成功
    function onSuccess(position) {
        let longitude = position.coords.longitude
        let latitude = position.coords.latitude
            // console.log(longitude, latitude)
        getlocset.innerText = '定位完成！' + " \n " + '请打开地图确认是否为你当前坐标' + " \n " + '若相差过大，请点击切换坐标系统';

        // console.log("经度:" + longitude + ", 纬度:" + latitude);
        global_longitude = longitude
        global_latitude = latitude

        /**
         * 坐标常量说明：
         * COORDINATES_WGS84 = 1, WGS84坐标
         * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
         * COORDINATES_GCJ02 = 3，GCJ02坐标
         * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
         * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
         * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
         * COORDINATES_MAPBAR = 7，mapbar地图坐标
         * COORDINATES_51 = 8，51地图坐标
         */

        if (hidden == 0) {
            map.style.display = 'none'
            buttomset.innerText = '在地图上展示当前位置'
            hidden = 1
        }

    }

    function onError(error) {
        switch (error.code) {
            case 1:
                alert("位置服务被拒绝");
                break;

            case 2:
                alert("暂时获取不到位置信息");
                break;

            case 3:
                alert("获取信息超时，请重新定位");
                break;

            case 4:
                alert("未知错误");
                break;
        }
    }

    function runpc(element) {
        getLocation()
        var pcid = element.id;
        // console.log(pcid);

        if (pcid == 'pointcheck1') {
            pcnum = 0
        } else if (pcid == 'pointcheck2') {
            pcnum = 1
        } else if (pcid == 'pointcheck3') {
            pcnum = 2
        }
        getStudentId()
    }

    function pointcheck(aim_longitude, aim_latitude, src, initial) {
        if (coordinate == 1) {
            real_latitude = global_latitude1
            real_longitude = global_longitude1
        } else if (coordinate == 0) {
            real_longitude = global_longitude
            real_latitude = global_latitude
        }
        // console.log("真实经度" + real_longitude + "," + "真实纬度" + real_latitude)
        var distance = 100000 * Math.sqrt(Math.pow((real_latitude - aim_latitude), 2) + Math.pow((real_longitude - aim_longitude), 2))
            // console.log("距离" + distance)

        pic.style.display = ""
        if (distance <= 20) {
            pic.src = src
            switch (pcnum) {
                case 0:
                    setfbl.style.display = '';
                    setfbl.innerText = "恭喜你到达1点位，请根据下图前往2点位";
                    document.getElementById("pointcheck2").style.display = "";
                    document.getElementById("pointcheck1").style.display = "none";
                    break;
                case 1:
                    setfbl.style.display = '';
                    setfbl.innerText = "恭喜你到达2点位，请根据下图前往3点位" + " \n " + "秘钥已出现在下方";
                    document.getElementById("pointcheck3").style.display = "";
                    document.getElementById("pointcheck2").style.display = "none";
                    setfbl2.innerText = "两位数字：一笔增百倍，少一笔减九成"
                    setfbl2.style.color = "dimgray"
                    break;
                case 2:
                    setfbl.style.display = '';
                    setfbl.innerText = "恭喜你到达3点位，请根据下图前往4点位" + " \n " + "到达点位后，你需要在上面的输入框中输入“部门代码+批次号”作为暗码，图片下方会显示你的最后谜语";
                    document.getElementById("pointcheck3").style.display = "none";
                    break;
                default:
                    ;
            }
            return true
        } else {
            if (pcnum == 0) {
                pic.src = initial
                setfbl.style.display = '';
                setfbl.innerText = "在你已知的目的地，有三个小伙伴在等你哦" + " \n " + "告诉你一个接头暗号：" + " \n " + "我含芳踏青，" + " \n " + "爱四月春协";

            } else {
                setfbl.style.display = '';
                setfbl.innerText = "oh~oh~还离下一个点位还有点远哦~";
                return false
            }
        }
    }

    function getRoadFromId() {
        var roadFromId = {}
            // console.log(road)
        var plsout = false
        for (i = 0; i < road.length;) {
            let students = road[i].students;
            for (j = 0; j < students.length; j++) {
                let id = students[j]
                if (id == studentId) {
                    roadFromId = road[i];
                    setfbl.style.display = 'none';
                    plsout = true;
                    break;
                }
            }
            if (plsout) {
                break;
            }
            i++;
            if (i == road.length) {
                setfbl.style.display = '';
                setfbl.innerText = '请输入正确的学号';
                document.getElementById("studentId").value = "";
                pic.style.display = "none"
                break;
            }

        }
        var poses = roadFromId.pos
        let res = pointcheck(poses[pcnum].posx, poses[pcnum].posy, poses[pcnum].src, roadFromId.initial)

    }

    function getStudentId() {
        studentId = parseInt(document.getElementById("studentId").value)
        setfbl.style.display = 'none';
        if (studentId == 1415926) {
            document.getElementById("pointcheck1").style.display = ""
            document.getElementById("pointcheck2").style.display = ""
            document.getElementById("pointcheck3").style.display = ""
        } else if (studentId == 121) {
            setfbl2.innerText = "一位数字：人有我大，天无我大";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        } else if (studentId == 091) {
            setfbl2.innerText = "一位数字：添两只鸟儿对头飞，一只瘦来，一只肥";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        } else if (studentId == 211) {
            setfbl2.innerText = "一位数字：数字虽小却在百万之上";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        } else if (studentId == 122) {
            setfbl2.innerText = "一位数字：虚心";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        } else if (studentId == 092) {
            setfbl2.innerText = "一位数字：不在上面，全在下面";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        } else if (studentId == 212) {
            setfbl2.innerText = "一位数字：旭日东升";
            setfbl.innerText = "你需要得到破解后的五位数字，来作为进门的暗语";
        }
        // console.log(studentId)
        getRoadFromId()
    }

    function load() {
        getLocation()
        showMap(global_longitude.global_latitude)
        map.style.display = "none"
        pic.style.display = "none"

    }

    window.onload = load()