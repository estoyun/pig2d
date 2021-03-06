/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 19.
 * Time: 오후 4:36
 * To change this template use File | Settings | File Templates.
 */

var spine_data_src = {
    "bones": [
        { "name": "root", "length": 60 }
    ],
    "slots": [
        { "name": "mn0", "bone": "root", "attachment": "mn_0_00" }
    ],
    "skins": {
        "default": {
            "mn0": {
                "mn_0_00": { "x": -15, "y": 28, "width": 85, "height": 56 },
                "mn_0_01": { "x": -17, "y": 27.99, "width": 85, "height": 55 },
                "mn_0_02": { "x": -15, "y": 28.99, "width": 85, "height": 57 },
                "mn_0_03": { "x": 1, "y": 22, "width": 56, "height": 43 },
                "mn_0_04": { "x": -5.99, "y": 22, "width": 86, "height": 46 },
                "mn_0_05": { "x": -5.99, "y": 23, "width": 84, "height": 46 },
                "mn_0_06": { "x": -17, "y": 25.99, "width": 105, "height": 52 },
                "mn_0_07": { "x": -16.99, "y": 25, "width": 106, "height": 52 },
                "mn_0_08": { "x": -15, "y": 44.99, "width": 102, "height": 92 },
                "mn_0_09": { "x": -12, "y": 46, "width": 97, "height": 92 },
                "mn_0_10": { "x": -21, "y": 20.99, "width": 112, "height": 46 },
                "mn_0_11": { "x": -15.99, "y": 25, "width": 98, "height": 49 }
            }
        }
    },
    "animations": {
        "animation": {
            "slots": {
                "mn0": {
                    "attachment": [
                        { "time": 0, "name": "mn_0_00" },
                        { "time": 0.1666, "name": "mn_0_01" },
                        { "time": 0.3333, "name": "mn_0_02" },
                        { "time": 0.6666, "name": "mn_0_03" },
                        { "time": 0.8333, "name": "mn_0_04" },
                        { "time": 0.9, "name": "mn_0_05" },
                        { "time": 0.9666, "name": "mn_0_06" },
                        { "time": 1, "name": "mn_0_07" },
                        { "time": 1.1666, "name": "mn_0_08" },
                        { "time": 1.5, "name": "mn_0_09" },
                        { "time": 1.5666, "name": "mn_0_10" },
                        { "time": 1.8333, "name": "mn_0_11" },
                        { "time": 2, "name": "mn_0_11" }
                    ]
                }
            }
        }
    }
};

var Smgr = new Pig2d.SceneManager({
    container : document.querySelector('#sprite_window')
});

//solt모델 생성을 위한 인자값 추출하기
var ani_obj =  Pig2d.util.spine.extractAnimation({
    spine_data : spine_data_src, //스파인 툴 데이터
    slot_name : 'mn0',     //추출해낼 슬롯이름
    base_url : '../../res/shanny/mon_0', //텍스춰 경로명
    img_type : 'png' //텍스춰 파일 타입

});

console.log(ani_obj);

//노드 생성
var node = new Pig2d.node({
    el : $('<div></div>')
});

//스파인툴의 슬롯정보로 스프라이트 만들기
var model = new Pig2d.SlotSpriteModel( {
        data : ani_obj
    }
);

//상호 연결
model.set({node:node});
node.set({model: model});

node.get('model')
    .setPosition(160,120)
    .setFrame(0);

var nodelist = [];

nodelist.push(node);


for(var i=0;i<96;i++) {

    var rndx = (Math.random() * 320);
    var rndy = (Math.random() * 240)+20;

    var node_clone = node.clone();
    node_clone.get('model')
        .setPosition(rndx,rndy)
        .setFrame(0);

    nodelist.push(node_clone);

}


//씬에 노드 추가 하기

for(var i=0;i<nodelist.length;i++) {

    Smgr.add(nodelist[i]);
}






var mytimer = new gbox3d.core.Timer();

var framerate_info = document.querySelector("#text-framerate-info");

//////////
//60프레임
//var accTick = 0;
//
//var startFrame = 0;
//var endFrame = model.get('data').animation.length -1;


var applier = [];
//구간 반복애니메이션
for(var i=0;i<nodelist.length;i++) {

    var aply = nodelist[i].get('model').getAnimation_applier({
        startFrame:0
    });

    applier.push(aply);

}

var frame_total = 0;
var loop_count = 0;

requestAnimationFrame(
    function loop() {

        var deltaTime = mytimer.getDeltaTime();

        frame_total += Math.round(1.0 / deltaTime);
        loop_count++;

        framerate_info.innerText = Math.round(frame_total / loop_count);

        for(var i=0;i<applier.length;i++) {
            applier[i](deltaTime);

        }
        Smgr.updateAll();
        requestAnimationFrame(loop);

    }

);













