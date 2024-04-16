"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderState = void 0;
var OrderState;
(function (OrderState) {
    OrderState[OrderState["Pendiente"] = 1] = "Pendiente";
    OrderState[OrderState["Completo"] = 2] = "Completo";
    OrderState[OrderState["EnProceso"] = 3] = "EnProceso";
})(OrderState || (exports.OrderState = OrderState = {}));
