"use strict";(self["webpackChunkbias_sorter"]=self["webpackChunkbias_sorter"]||[]).push([[859],{44859:(t,s,r)=>{r.r(s),r.d(s,{default:()=>L});var n=r(56768),o=r(24232),u={class:"listBox"},i=["onClick"],e={class:"groupNameList"};function c(t,s,c,l,a,p){var f=(0,n.g2)("v-lazy-image");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("div",null,[(0,n.Lk)("button",{onClick:s[0]||(s[0]=function(t){return p.switchList("b")}),class:"diffList"},"Boy Groups"),(0,n.Lk)("button",{onClick:s[1]||(s[1]=function(t){return p.switchList("g")}),class:"diffList"},"Girl Groups"),(0,n.Lk)("button",{onClick:s[2]||(s[2]=function(t){return p.switchList("s")}),class:"diffList"},"Soloists")]),(0,n.Lk)("div",u,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(t.currentList,(function(t){return(0,n.uX)(),(0,n.CE)("div",null,[(0,n.Lk)("div",{class:"groupDiv",onClick:function(s){return p.populateGroupPage(t)}},[(0,n.bF)(f,{class:"groupPicList",src:r(74186)("./"+t.imgLink)},null,8,["src"]),(0,n.Lk)("p",e,(0,o.v_)(t.groupName),1)],8,i)])})),256))])],64)}r(2008),r(25276),r(44114),r(60739),r(33110),r(79432),r(26099);var l=r(25016),a=r(64163),p=JSON.parse(localStorage.getItem("selectedGroup"));const f={name:"GroupsView",components:{VLazyImage:a.A},data:function(){return{groupsData:l,currentList:[]}},methods:{populateGroupPage:function(t){null===p&&(p=[]),p=t,localStorage.setItem("selectedGroup",JSON.stringify(p)),this.$router.push("/groupPage"),document.body.scrollTop=0,document.documentElement.scrollTop=0},switchList:function(t){this.currentList="b"===t?this.boyGroups:"g"===t?this.girlGroups:this.solo}},computed:{boyGroups:function(){var t=this.groupsData;return t.filter((function(t){return t.bgs.indexOf("b")>-1}))},girlGroups:function(){var t=this.groupsData;return t.filter((function(t){return t.bgs.indexOf("g")>-1}))},solo:function(){var t=this.groupsData;return t.filter((function(t){return t.bgs.indexOf("s")>-1}))}},mounted:function(){this.currentList=this.boyGroups}};var g=r(71241);const d=(0,g.A)(f,[["render",c],["__scopeId","data-v-2a32f052"]]),L=d}}]);
//# sourceMappingURL=859.628a7979.js.map