(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b7d16b2c"],{"015c":function(e,t,n){"use strict";n("5fbc")},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[t("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},i=[];n("a9e3");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var a=s(),i=e-a,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var s=Math.easeInOutQuad(c,a,i,t);r(s),c<t?o(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("015c"),n("2877")),h=Object(d["a"])(u,a,i,!1,null,"001cdde0",null);t["a"]=h.exports},"5a80":function(e,t,n){},"5fbc":function(e,t,n){},"6b9b":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("b64b"),n("d3b7"),n("498a"),n("159b");var a=function(e){return Object.keys(e).forEach((function(t){e[t]="string"===typeof e[t]?e[t].trim():e[t]})),e}},"8f31":function(e,t,n){},"9c24":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"reservation_booking"},[t("el-row",{staticClass:"app-container list-account"},[t("el-row",{staticClass:"list-account__header"},[t("el-col",{attrs:{sm:24}},[t("h3",{staticClass:"title"},[e._v("QUẢN LÝ OPTION THÀNH TÍCH")])]),t("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAddEvent}},[e._v("Thêm mới ")])],1),t("div",{staticClass:"filter-container mt-10"},[t("el-row",[t("el-col",{staticClass:"mr-10",attrs:{sm:24,md:4,lg:4}},[t("el-input",{staticClass:"w-100",attrs:{clearable:"",placeholder:"Nhập tên"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter.apply(null,arguments)}},model:{value:e.query.keyword,callback:function(t){e.$set(e.query,"keyword",t)},expression:"query.keyword"}})],1),t("el-col",{attrs:{sm:12,md:8}},[t("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-refresh",round:""},on:{click:e.onReset}},[e._v("Reset")]),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" Tìm kiếm ")])],1)],1)],1),t("el-row",{staticClass:"list-account__data"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingTable,expression:"loadingTable"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{label:"STT",width:"50",align:"center",type:"index",index:e.handleIndexMethod}}),t("el-table-column",{attrs:{prop:"achievement_name",label:"Loại thành tích",align:"center"}}),t("el-table-column",{attrs:{label:"Custom name",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){var a=n.row;return[t("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},on:{change:function(t){return e.changeDisplay(a)}},model:{value:a.is_custom,callback:function(t){e.$set(a,"is_custom",t)},expression:"row.is_custom"}})]}}])}),t("el-table-column",{attrs:{label:"Hành động",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"warning",icon:"el-icon-edit",size:"mini",round:""},on:{click:function(t){return e.handleEditEvent(n.row)}}},[e._v(" Sửa ")]),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini",round:""},on:{click:function(t){return e.handleDeleteEvent(n.row.id)}}},[e._v(" Xóa ")])]}}])})],1),t("el-row",{staticClass:"list-shop__footer"},[t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>e.query.limit,expression:"total > query.limit"}],attrs:{total:e.total,limit:e.query.limit,page:e.query.page},on:{"update:limit":function(t){return e.$set(e.query,"limit",t)},"update:page":function(t){return e.$set(e.query,"page",t)},pagination:e.onGetList}})],1),t("dialog-option-achievement",{attrs:{"show-dialog":e.showDialogAddEvent,"object-data":e.objectData,"is-add":e.isAdd},on:{onCloseDialog:e.handleClose}})],1)],1)],1)},i=[],o=n("c7eb"),r=n("1da1"),s=(n("d3b7"),n("333d")),l=n("a248"),c=function(){var e=this,t=e._self._c;return t("el-dialog",{attrs:{title:e.dialog.titleName,visible:e.showDialog,width:"40%","before-close":e.handleClose},on:{"update:visible":function(t){e.showDialog=t}}},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{rules:e.rules,model:e.objectData}},[t("el-row",[t("el-col",{attrs:{sm:24,md:24}},[t("el-form-item",{attrs:{label:"Loại thành tích :",required:""}},[t("el-form-item",{attrs:{prop:"name"}},[t("el-input",{attrs:{prop:"name",placeholder:"Loại thành tích"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSubmitForm("ruleForm")}},model:{value:e.formRequest.achievement_name,callback:function(t){e.$set(e.formRequest,"achievement_name",t)},expression:"formRequest.achievement_name"}})],1),t("el-form-item",{attrs:{label:"Custom tên thành tích"}},[t("el-radio-group",{staticClass:"w-100",model:{value:e.formRequest.is_custom,callback:function(t){e.$set(e.formRequest,"is_custom",t)},expression:"formRequest.is_custom"}},[t("el-radio",{attrs:{border:"",value:"0",label:0}},[e._v("Không")]),t("el-radio",{attrs:{border:"",value:"1",label:1}},[e._v("Có ")])],1)],1)],1)],1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.handleClose}},[e._v("Hủy")]),t("el-button",{attrs:{type:"primary",loading:e.loadingSubmit},on:{click:function(t){return e.onSubmitForm("ruleForm")}}},[e._v(e._s(e.dialog.buttonName))])],1)],1)},u=[],d=n("5530"),h=n("61f7"),m=new l["a"],f={name:"DialogOptionAchievement",props:{objectData:{type:Object,default:function(){return{}}},organizations:{type:Array,default:function(){return[]}},showDialog:{type:Boolean,default:!1},isAdd:{type:Boolean,default:!1}},data:function(){var e=this;return{rules:{name:[{validator:function(t,n,a){return Object(h["j"])(t,e.formRequest.achievement_name,a,"Tên thành tích")},trigger:"change"}]},loadingSubmit:!1,dialogLoading:!1,formRequest:{},dialog:{titleName:"Thêm mới thành tích",buttonName:"Thêm mới"}}},watch:{objectData:function(e){this.isAdd||(this.formRequest=Object(d["a"])({},e))},isAdd:function(e){console.log("isAdd",e),this.dialog=e?Object.assign({},{titleName:"Thêm mới thành tích",buttonName:"Thêm mới"}):Object.assign({},{titleName:"Cập nhật thành tích",buttonName:"Cập nhật"})}},methods:{onSubmitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(r["a"])(Object(o["a"])().mark((function e(n){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n&&(t.loadingSubmit=!0,t.isAdd?t.handleSubmitAdd():t.handleSubmitUpdate());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},handleSubmitAdd:function(){var e=this;return Object(r["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:m.store_option_achievement(e.formRequest).then((function(t){0===t.error_code?(e.$message.success(t.data),e.handleClose()):e.$message.error(t.error_msg)})).finally((function(){e.loadingSubmit=!1}));case 1:case"end":return t.stop()}}),t)})))()},handleSubmitUpdate:function(){var e=this;return Object(r["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:m.update_option_achievement(e.formRequest,e.formRequest.id).then((function(t){0===t.error_code?(e.$message.success(t.data),e.handleClose()):e.$message.error(t.error_msg)})).finally((function(){e.loadingSubmit=!1}));case 1:case"end":return t.stop()}}),t)})))()},resetformRequest:function(){var e=this;return Object(r["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve(e.formRequest={});case 2:e.$refs["ruleForm"].clearValidate();case 3:case"end":return t.stop()}}),t)})))()},changeDisplay:function(e){console.log("row................",e)},handleClose:function(){this.$emit("onCloseDialog",{dialog:!1,reload:!1}),this.resetformRequest()}}},p=f,g=(n("a5c6"),n("2877")),b=Object(g["a"])(p,c,u,!1,null,"774eeab8",null),v=b.exports,y=n("bcc2"),_=n("c1df"),w=n.n(_),k=n("6b9b"),q=new l["a"],j={name:"ListOptionAchievement",components:{Pagination:s["a"],DialogOptionAchievement:v},data:function(){return{tableData:[],loadingTable:!1,total:0,isAdd:!0,onShowDialog:!1,query:{limit:10,page:1},loadingData:!0,from:0,showDialogAddEvent:!1,objectData:{}}},watch:{dateRange:function(e){e?(this.query.start_date=w()(e[0]).unix(),this.query.end_date=w()(e[1]).unix()):(this.query.start_date="",this.query.end_date="")}},created:function(){this.onGetList()},methods:{onGetList:function(){var e=this;return Object(r["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadingTable=!0,t.next=3,e.trim_string_object(e.query);case 3:q.list_option_achievement(e.query).then((function(t){var n,a;0===t.error_code?(e.tableData=(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.data)||[],e.total=(null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.total)||0,console.log("this.tableData___________",e.tableData)):e.$message.error(t.error_msg)})).finally((function(){e.loadingTable=!1}));case 4:case"end":return t.stop()}}),t)})))()},handleFilter:function(){this.query.page=1,this.onGetList()},handleIndexMethod:function(e){return 1===this.query.page?this.query.page+e:10*this.query.page+e},onReset:function(){this.query=Object.assign({},{limit:10,page:1}),this.onGetList()},handleClose:function(e){this.showDialogAddEvent=e.dialog,this.onGetList()},handleAddEvent:function(){this.isAdd=!0,this.showDialogAddEvent=!0,this.objectData={}},handleEditEvent:function(e){this.isAdd=!1,this.showDialogAddEvent=!0,this.objectData=Object.assign({},e)},handleDeleteEvent:function(e){var t=this;this.$confirm("Bạn có chắc chắn xóa đơn vị này không ?").then((function(n){q.remove_option_achievement({id:e}).then((function(e){0===e.error_code?(t.onGetList(),t.$message.success(e.data)):t.$message.error(e.error_msg)}))}))},changeDisplay:function(e){var t=this;console.log("row................",e);var n={is_hidden:1===e.is_custom?1:0};q.change_status_custom(n,e.id).then((function(e){if(console.log("response................",e),1===e.error_code)return console.log("response................",e),void t.$message.error("Thay đổi trạng thái thất bại");t.$message.success("Thay đổi trạng thái thành công"),t.onGetList()}))},formatDate:y["g"],formatNumber:y["h"],trim_string_object:k["a"]}},C=j,O=(n("e859"),Object(g["a"])(C,a,i,!1,null,"34d0c429",null));t["default"]=O.exports},a5c6:function(e,t,n){"use strict";n("8f31")},e859:function(e,t,n){"use strict";n("5a80")}}]);