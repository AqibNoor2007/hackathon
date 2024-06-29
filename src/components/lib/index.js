import useWidth from "./hooks/useWidth";
import useToggleState from "./hooks/useToggleState";
import {
  getToken,
  setToken,
  removeToken,
  formatDate,
  formatTimeAgo,
} from "./utils/helperfun";
import {
  DoAuthentication,
  IsAuthenticated,
  IsProfileCompleted,
  IsProfileCompleting,
} from "./utils/authrizations";

export {
  useWidth,
  getToken,
  setToken,
  removeToken,
  formatDate,
  formatTimeAgo,
  DoAuthentication,
  IsProfileCompleted,
  IsAuthenticated,
  IsProfileCompleting,
  useToggleState,
};
