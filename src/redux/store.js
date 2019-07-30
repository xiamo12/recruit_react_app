// redux最核心的管理模块

// import { PropTypes } from "prop-types";

import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension" //引入工具模块




//向外暴露store对象
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

