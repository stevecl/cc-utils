  const uploadState = [
    {text:"全部",value:"-999"},
    {text:"符合要求",value:"0"},
    {text:"未符合",value:"1"}
  ]
  // 抽奖状态
  const awardState = [
    {text:"全部",value:"-999"},
    {text:"未抽取",value:"-1"},
    {text:"未中奖",value:"0"},
    {text:"未领取",value:"1"},
    {text:"已领取",value:"2"},
    {text:"审核中",value:"3"},
    {text:"审核失败",value:"4"},
    {text:"审核通过",value:"5"},
    {text:"待发货",value:"6"},
    {text:"已发货",value:"7"},
    {text:"已完成",value:"8"},
  ]
  // 奖品类型
  const awardType = [
    {text:"谢谢参与",value:"0"},
    {text:"现金红包",value:"1"},
    {text:"实物赠品",value:"2"}
  ]
  // 抽奖来源
  const awardSource = [
    {text:"场景体验",value:"0"},
    {text:"答题",value:"1"},
    {text:"上传小票",value:"2"},
    {text:"视频浏览",value:"3"}
  ]
export{
  uploadState,
  awardState,
  awardType,
  awardSource
}