import { DEV_BACKEND_URL, PROD_BACKEND_URL } from "@env";

const devEnvironmentVar = {
  DEV_BACKEND_URL,
};

const prodEnvironmentVar = {
  PROD_BACKEND_URL,
};

export default __DEV__ ? devEnvironmentVar : prodEnvironmentVar;
