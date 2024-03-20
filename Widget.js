///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'esri/tasks/query',
  'esri/tasks/QueryTask', 
  'dojo/dom-construct',
  'dojo/_base/array', 
  'dojo/_base/lang',
  'dojo/query',
  'dojo/on',
  'dojo/Deferred',
  'dojo/promise/all',
  'jimu/BaseWidget', 
  'esri/layers/FeatureLayer', 
  'esri/graphic',
  'esri/graphicsUtils',
  'esri/tasks/GPMessage',
  'esri/tasks/Geoprocessor',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/Color',
  'esri/request',
  "esri/SpatialReference",
  'jimu/dijit/Report', 
  'jimu/dijit/PageUtils'
],
function(declare, Query, QueryTask, domConstruct, array, lang, query, on, Deferred, all, BaseWidget,FeatureLayer,Graphic,graphicsUtils,GPMessage, Geoprocessor,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,Color,esriRequest,SpatialReference,Report,PageUtils) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    featureArray: new Array(),
    featureSet: null,
    clearFeatsEvt: null,
    baseClass: 'jimu-widget-sectores-as',
    sueeem: '',
    FeatureServer: '',
    layers: [],
    numeroServicios: 0,
    cantidadClientes: 0,
    metrosRedes: 0,

    postCreate: function() {
      this.inherited(arguments);
      this.eventoMapaServiciosAS();
      console.log('postCreate');
    },
    startup: function() {
      this.inherited(arguments);
      this.sueeem = this.config.sueeem
      this.FeatureServer = this.config.FeatureServer
      this.layers = this.config.layers
      console.log('startup');
    },
    onOpen: function(){
      console.log('onOpen');
      this.clear();
      this.sueeem = this.config.sueeem
      this.FeatureServer = this.config.FeatureServer
      this.layers = this.config.layers
      this.postOpenSectoresAS();
      this.getPanel().setPosition({relativeTo: "map", top: 30, right: 5, width: 420, height:800});
    },
    onClose: function(){
      this.clear();
      console.log('onClose');
    },
    onMinimize: function(){
      this.clear();
      console.log('onMinimize');
    },
    onMaximize: function(){
      this.clear();
      console.log('onMaximize');
    },
    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },
    onSignOut: function(){
      console.log('onSignOut');
    },
    postOpenSectoresAS: function(){
      var that = this;
      console.log('postOpenSectoresAS');
      Clear_AS = fn_Limpiar_AS
      radioSelect_AS = funcionRadioSelect_AS;
      Sectorizar_AS = fn_Sectorizar_AS;
      
      //no utility network
      var inlineRadioA_AS = document.getElementById("RadioA_AS")
      // var inlineRadioB_AS = document.getElementById("RadioB_AS")
      var inputA_AS = document.getElementById("inputA_AS")
      // var inputB_AS = document.getElementById("inputB_AS")
      //no utility network
      var inlineRadio1_AS = document.getElementById("Radio1_AS")
      var inlineRadio2_AS = document.getElementById("Radio2_AS")
      var input1_AS = document.getElementById("input1_AS")
      var input2_AS = document.getElementById("input2_AS")

      //mostrar
      function funcionRadioSelect_AS(id){
        //no utility network
        if(id == "RadioA_AS") {
          inputA_AS.placeholder = that.sueeem;
        } else  {
          inputA_AS.placeholder = "";
          inlineRadioA_AS.checked = false
        };
        // if(id == "RadioB_AS") {
        //   inputB_AS.placeholder = that.sueeem;
        // } else  {
        //   inputB_AS.placeholder = "";
        //   inlineRadioB_AS.checked = false
        // };

        //no utility network
        if(id == "Radio1_AS") {
          input1_AS.placeholder = that.sueeem;
        } else  {
          input1_AS.placeholder = "";
          inlineRadio1_AS.checked = false
        };
        if(id == "Radio2_AS") {
          input2_AS.placeholder = that.sueeem;
        } else  {
          input2_AS.placeholder = "";
          inlineRadio2_AS.checked = false
        };

        if(inlineRadioA_AS.checked && inputA_AS.value){
          btnMostrarSector_AS.disabled = false;
        // }else if(inlineRadioB_AS.checked && inputB_AS.value){
        //   btnMostrarSector_AS.disabled = false;
        }else if(inlineRadio1_AS.checked && input1_AS.value){
          btnMostrarSector_AS.disabled = false;
        }else if(inlineRadio2_AS.checked && input2_AS.value){
          btnMostrarSector_AS.disabled = false;
        }else{
          btnMostrarSector_AS.disabled = true;
        }
      }

      function fn_Sectorizar_AS(){
        that.map.graphics.clear();
        if(inlineRadioA_AS.checked && inputA_AS.value){
          inputA_AS.alt = "systemsubnetworkname = '" + inputA_AS.value + "'";
          that.get_Sectorizar_AS(inputA_AS.alt);
        // }else if(inlineRadioB_AS.checked && inputB_AS.value){
        //   inputB_AS.alt = "sewershedsubnetworkname = '" + inputB_AS.value + "'";
        //   that.get_Sectorizar_AS(inputB_AS.alt);
        }else if(inlineRadio1_AS.checked && input1_AS.value){
          input1_AS.alt = "codigo_area_tributaria = '" + input1_AS.value + "'";
          that.get_Sectorizar_AS(input1_AS.alt);
        }else if(inlineRadio2_AS.checked && input2_AS.value){
          input2_AS.alt = "codigo_subcuenca = '" + input2_AS.value + "'";
          that.get_Sectorizar_AS(input2_AS.alt);
        }
      }
      function fn_Limpiar_AS(){
        that.clear();
      }
    },
    resumenSectorAS: function(numeroServicios, cantidadClientes, metrosRedes){
      that = this;
      that.clearNode("zoneInfo_AS");
      function sector(){
        var inlineRadio1_AS = document.getElementById("Radio1_AS")
        var inlineRadio2_AS = document.getElementById("Radio2_AS")
        var inlineRadioA_AS = document.getElementById("RadioA_AS")
        // var inlineRadioB_AS = document.getElementById("RadioB_AS")

        if(inlineRadio1_AS.checked){
          return inlineRadio1_AS.value;
        }else if(inlineRadio2_AS.checked){
          return inlineRadio2_AS.value;
        }else if(inlineRadioA_AS.checked){
          return inlineRadioA_AS.value;
        // }else if(inlineRadioB_AS.checked){
        //   return inlineRadioB_AS.value;
        }else{
          return "";
        }
      }

      ahora = that.thisNow()
      var tarjetaSectorAS  = domConstruct.create("div",  {'id':'card_as_'.concat(ahora), 'class':'card bg-light mb-3'}, "zoneInfo_AS");
      var cabeceraSectorAS = domConstruct.create("div",  {'id':'head_as_'.concat(ahora), 'class':'card-header text-center'}, tarjetaSectorAS );
      var cuerpoSectorAS   = domConstruct.create("div",  {'id':'body_as_'.concat(ahora), 'class':'card-body'}, tarjetaSectorAS );
      var pieSectorAS      = domConstruct.create("div",  {'id':'foot_as_'.concat(ahora), 'class':'card-footer'}, tarjetaSectorAS );
      cuerpoSectorAS .style.padding = ".25rem"
      //cabecera
      cabeceraSectorAS .innerHTML = "<h5>Datos " + sector() + "</h5>";

      //datos sector
      var table = domConstruct.create("table", {'id':'tT_'.concat(ahora), 'class':'table table-condensed'}, cuerpoSectorAS );
      var tBody = domConstruct.create("tbody", {'id':'bT_'.concat(ahora), 'class':''}, table);

      //Cantidad de Servicios
      var dat = tBody.insertRow(-1);
      var name = dat.insertCell(-1);
      name.style.padding = ".1rem";
      name.innerHTML = "Cantidad de servicios";
      var dosPunto = dat.insertCell(-1);
      dosPunto.style.padding = ".1rem";
      dosPunto.innerHTML = ":";
      var value = dat.insertCell(-1);
      value.style.padding = ".1rem";
      value.innerHTML =  numeroServicios;
      var end = dat.insertCell(-1);
      end.style.padding = ".1rem";
      end.innerHTML =  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

      //Cantidad de Clientes
      var dat = tBody.insertRow(-1);
      var name = dat.insertCell(-1);
      name.style.padding = ".1rem"
      name.innerHTML = "Cantidad de clientes";
      var dosPunto = dat.insertCell(-1);
      dosPunto.style.padding = ".1rem";
      dosPunto.innerHTML = ":";
      var value = dat.insertCell(-1);
      value.style.padding = ".1rem";
      value.innerHTML =  cantidadClientes;
      var end = dat.insertCell(-1);
      end.style.padding = ".1rem";
      end.innerHTML =  "&nbsp;";

      //Metros lineales
      var dat = tBody.insertRow(-1);
      var name = dat.insertCell(-1);
      name.style.padding = ".1rem";
      name.innerHTML = "Largo de Red (mts)";
      var dosPunto = dat.insertCell(-1);
      dosPunto.style.padding = ".1rem";
      dosPunto.innerHTML = ":";
      var value = dat.insertCell(-1);
      value.style.padding = ".1rem";
      value.innerHTML =  metrosRedes.toFixed(2);
      var end = dat.insertCell(-1);
      end.style.padding = ".1rem";
      end.innerHTML =  "&nbsp;";
    },
    get_Sectorizar_AS: async function(query_str){
      var that = this;
      var numeroServicios = 0;
      var cantidadClientes = 0;
      var metrosRedes = 0;
      map = that.map;

      var query = new Query();
      query.where = query_str;
      query.returnGeometry = true;
      query.outFields = ['*'];
      query.outSpatialReference= new SpatialReference(102100);

      that.layers.forEach(ly =>{
        var qt = new QueryTask(that.FeatureServer + ly);
        qt.execute(query, function (response) {
          if (ly == '315'){
            var extent = response.features[0].geometry.getExtent()
          }
          response.features.forEach(ft => {
            console.log('ly: ', ly, ' assetgroup: ', ft.attributes.assetgroup, '\n', 'ft: ', ft)
            if (ly == '300' && ft.attributes.assetgroup == 7){
              numeroServicios++;
              if (ft.attributes.cantidad_cliente > 0){
                cantidadClientes += ft.attributes.cantidad_cliente;
              }
            }
            if (ly == '315' && ft.attributes.assetgroup != 3){
              var METROSLINEALES = ft.attributes.Shape__Length.toFixed(2);
              metrosRedes += parseFloat(METROSLINEALES)
              extent = extent.union(ft.geometry.getExtent());
            }
            that.resaltarASEnMapa(ft, [128,0,0], 16);
          })
          that.resumenSectorAS(numeroServicios, cantidadClientes, metrosRedes);
          if (ly == '315'){
            that.map.setExtent(extent);
          }
        });
      });
    },
    eventoMapaServiciosAS: function(){
      that = this;
      that.own(this.setFeatsEvt = on(that.map.infoWindow, "set-features", lang.hitch(this, function(){
        that.clear()
        //enable navigation if more than one feature is selected
        if(that.map.infoWindow.features != null && that.map.infoWindow.features.length > 0){
          that.map.infoWindow.features.forEach(feature => {
            var layerID = feature.getLayer().id;
            if(layerID.includes('servidas')||layerID.includes('SERVIDAS')||layerID.includes('Servidas')){
              that.resaltarASEnMapa(feature, [128,0,0], 16);
              that.selectObjectAS(feature);
            }
          });
        } else {
          that.clear();
        }
      })));
      that.own(this.selChgEvt = on(that.map.infoWindow, "selection-change", lang.hitch(this, function (evt) {
        if(evt.target.getSelectedFeature()){
          console.log("selection-change\n", evt.target)
        }
      })));
      that.own(this.clearFeatsEvt = on(that.map.infoWindow, "clear-features", lang.hitch(this, function (evt) {
        if(!evt.isIntermediate){
          that.clear();
          that.postOpenSectoresAS();
        }
      })));
    },
    selectObjectAS: function(featureSet){
      var titulo_AS = document.getElementById("subtitulo_AS");
      var nombreCapa = featureSet.getLayer().name;
      var identiCapa = featureSet.getLayer().id;
      console.log(identiCapa)
    
      if(identiCapa.includes('SERVIDAS')){    
        // titulo_AS.innerHTML = "<h6>"+nombreCapa+"</h6>";

        var assetid = featureSet.attributes.assetid;
        var systemsubnetwork = featureSet.attributes.systemsubnetworkname;
        var sewershedsubnetwork = featureSet.attributes.sewershedsubnetworkname;
        slct_AS_UTILITY(assetid, systemsubnetwork, sewershedsubnetwork);

        var codigo_area_tributaria = featureSet.attributes.codigo_area_tributaria;
        var codigo_subcuenca = featureSet.attributes.codigo_subcuenca;
        // if (codigo_area_tributaria != null && codigo_subcuenca != null){}
        slct_AS(assetid, codigo_area_tributaria, codigo_subcuenca);

        console.log ("featureSet", featureSet);
        console.log ("slct_1",assetid, systemsubnetwork, sewershedsubnetwork);
        console.log ("slct_2",assetid, codigo_area_tributaria, codigo_subcuenca);
        document.getElementById("zoneInfo_AS").innerHTML = "";
      } else {
        slct_AS_UTILITY(null, null, null);
        slct_AS(null, null, null);
        document.getElementById("zoneInfo_AS").innerHTML = "<h6>Seleccione un objeto de Sewer Utility Network. . .</h6>";
      };

      function slct_AS_UTILITY(assetid, systemsubnetwork, sewershedsubnetwork){
        //utility
        var radioA_AS = document.getElementById("RadioA_AS");
        // var radioB_AS = document.getElementById("RadioB_AS");
        var inputA_AS = document.getElementById("inputA_AS");
        // var inputB_AS = document.getElementById("inputB_AS");

        inputA_AS.value = systemsubnetwork;
        inputA_AS.alt = "systemsubnetworkname = '" + systemsubnetwork + "'";
        // inputB_AS.value = sewershedsubnetwork;
        // inputB_AS.alt = "sewershedsubnetworkname = '" + sewershedsubnetwork + "'";

        /*-*/
        var btnMostrarSector_AS = document.getElementById("btnMostrarSector_AS");

        if(radioA_AS.checked && inputA.value){
          btnMostrarSector_AS.disabled = false;
        // }else if(radioB_AS.checked && inputB.value){
        //   btnMostrarSector_AS.disabled = false;
        }else{
          btnMostrarSector_AS.disabled = true;
        }
        /*-*/
      }
      function slct_AS(assetid, codigo_area_tributaria,codigo_subcuenca){
        var radio1_AS = document.getElementById("Radio1_AS");
        var radio2_AS = document.getElementById("Radio2_AS");
        var input1_AS = document.getElementById("input1_AS");
        var input2_AS = document.getElementById("input2_AS");

        var btnMostrarSector_AS = document.getElementById("btnMostrarSector_AS");

        if (codigo_area_tributaria != null){
          input1_AS.value = codigo_area_tributaria;
          input1_AS.alt = "codigo_area_tributaria = '" + codigo_area_tributaria + "'";  
        }
        if (codigo_subcuenca != null){
          input2_AS.value = codigo_subcuenca;
          input2_AS.alt = "codigo_subcuenca = '" + codigo_subcuenca + "'"; 
        }

        if(radio1_AS.checked && input1_AS.value){
          btnMostrarSector_AS.disabled = false;
        }else if(radio2_AS.checked && input2_AS.value){
          btnMostrarSector_AS.disabled = false;
        }else{
          btnMostrarSector_AS.disabled = true;
        }
      }
    },
    resaltarASEnMapa(feature, RGBA, size){
      if (feature){
        // console.log("add feature in map:", feature)
        var L = RGBA.length;
        var R = (L > 0) ? RGBA[0] : 127;
        var G = (L > 1) ? RGBA[1] : 63; 
        var B = (L > 2) ? RGBA[2] : 31;
        var A = (L > 3) ? RGBA[3] : 0.75;
        var SIZE = (size > 0) ? size : 12;
        //pintado
        if (feature.geometry.type == "point" ||feature.geometry.type == "multiPoint") {
          //linea
          var simbologia = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 
            SIZE,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([R,G,B]), 4),
            new Color([R,G,B,A])
          );
        }
        else if (feature.geometry.type == "line" ||feature.geometry.type == "polyline") {
          var simbologia = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([R,G,B]), 4);
        }
        
        var graphicElemnts = new Graphic(feature.geometry, simbologia, feature.attributes);
        this.map.graphics.add(graphicElemnts);
        // var stateExtent = feature.geometry.getExtent();//.expand(5.0);
        // this.map.setExtent(stateExtent);
      };
    },
    clear : function (){
      var that = this;
      this.map.graphics.clear();
      console.clear();
      that.clearNode("subtitulo_AS");
      that.clearNode("zoneInfo_AS");
      document.getElementById("Sectorizar_AS").style.display = "block";
      
      document.getElementById("RadioA_AS").checked = false;
      // document.getElementById("RadioB_AS").checked = false;
      document.getElementById("Radio1_AS").checked = false;
      document.getElementById("Radio2_AS").checked = false;

      var input1_AS = document.getElementById("input1_AS");
      input1_AS.value = "";
      input1_AS.alt = "1 = 1";
      input1_AS.placeholder = that.sueeem;
      var input2_AS = document.getElementById("input2_AS");
      input2_AS.value = "";
      input2_AS.alt = "1 = 1";
      input2_AS.placeholder = that.sueeem;
      var inputA_AS = document.getElementById("inputA_AS");
      inputA_AS.value = "";
      inputA_AS.alt = "1 = 1";
      inputA_AS.placeholder = that.sueeem;
      // var inputB_AS = document.getElementById("inputB_AS");
      // inputB_AS.value = "";
      // inputB_AS.alt = "1 = 1";
      // inputB_AS.placeholder = that.sueeem;

      this.getPanel().setPosition({relativeTo: "map", top: 30, right: 5, width: 420, height:800});
    },
    clearNode: function(nameNode) {
      var node = document.getElementById(nameNode);
      while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      };
    },
    thisNow: function() {
      var that = this;
      var ahora = new Date(Date.now())
      var esteAño = ahora.getFullYear();
      var esteMes = ahora.getMonth() + 1;
      var esteDia = ahora.getDate();

      var valor = esteAño;
      valor += "-";
      if (esteMes < 10) valor += "0" + esteMes;
      else valor += esteMes;
      valor += "-";
      if (esteDia < 10) valor += "0" + esteDia;
      else valor += esteDia;

      return valor;
    }
  });
});