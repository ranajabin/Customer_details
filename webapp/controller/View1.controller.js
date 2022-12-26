sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/ui/core/IconPool",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, IconPool, Dialog, Button, mobileLibrary, List, StandardListItem, Text) {
        "use strict";


        return Controller.extend("fragment1.fragmentproject1.controller.View1", {
            onInit: function () {
                //To bind data from a json file
                //    var oModel = new sap.ui.model.json.JSONModel("../model/Customer.json");
                //    this.getView().setModel(oModel, "customer1");

                // To bind data from a json file using jquery
                // var path = jQuery.sap.getModulePath("fragment1.fragmentproject1","/model/Customer.json")
                // let oModel = new sap.ui.model.json.JSONModel(path);
                // this.getView().setModel(oModel,"customer1");

                // store data(local) in an array and bind into a list
                var Customer =
                {
                    "custdetail": [{
                        "custid": "1001",
                        "companyname": "Nestle"
                    },
                    {
                        "custid": "2002",
                        "companyname": "Britannia"
                    },
                    {
                        "custid": "3003",
                        "companyname": "Patanjali"
                    }]
                };

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(Customer);
                this.getView().setModel(oModel, "customer1");
            },

            onLoadDialog: function () {
                if (!this.oDefaultDialog) {
                    this.oDefaultDialog = new sap.m.Dialog({
                        title: "Customer Details",
                        content: new sap.m.List({
                            items: {
                                path: "customer1>/custdetail",
                                template: new StandardListItem({
                                    title: "{customer1>custid}",
                                    description: "{customer1>companyname}",
                                    // title: "{customer1>custid} {customer1>companyname}",
                                    // info: "{customer1>companyname}",
                                    type: "Active",
                                    press: function (oEvent) {
                                        var oSelectedItem = oEvent.oSource.mProperties;
                                        var oInput = this.byId("custId");
                                        oInput.setValue(oSelectedItem.title);
                                    }.bind(this)
                                })
                            }                            
                        }),
                        beginButton: new sap.m.Button({
                            text: "OK",
                            press: function () {
                                this.oDefaultDialog.close();
                            }.bind(this)
                        }),
                        endButton: new sap.m.Button({
                            text: "Close",
                            press: function () {
                                this.oDefaultDialog.close();
                            }.bind(this)
                        })
                    });

                    // to get access to the controller's model
                    this.getView().addDependent(this.oDefaultDialog);
                }

                this.oDefaultDialog.open();
            }

        });
    });
