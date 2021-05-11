// Core
import jsonServerProvider from "ra-data-json-server";

// Components
import config from "../../config";
import { AdminHttpClient } from "./AdminHttpClient";

const myDataProvider = jsonServerProvider(config.baseApiUrl, AdminHttpClient);
export const dataProvider = {
  ...myDataProvider,
  create: (resource: any, params: any) => {
    if (
      resource !== "imgs" &&
      resource !== "masseurtype" &&
      resource !== "masseur"
    ) {
      return myDataProvider.create(resource, params);
    }

    if (resource === "imgs") {
      let formData = new FormData();

      formData.append("alt", params.data.alt);
      formData.append("file", params.data.file.rawFile);

      return AdminHttpClient(`${config.baseApiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }: any) => ({
        data: { ...params.data, id: json.id },
      }));
    } else if (resource === "masseurtype") {
      let formData = new FormData();

      formData.append("name", params.data.name);
      formData.append("price", params.data.price);
      formData.append("description", params.data.description);
      formData.append("file", params.data.file.rawFile);

      return AdminHttpClient(`${config.baseApiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }: any) => ({
        data: { ...params.data, id: json.id },
      }));
    } else {
      let formData = new FormData();

      formData.append("userId", params.data.userId);
      formData.append("description", params.data.description);
      formData.append("occupation", params.data.occupation);
      formData.append("file", params.data.file.rawFile);

      return AdminHttpClient(`${config.baseApiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      }).then(({ json }: any) => ({
        data: { ...params.data, id: json.id },
      }));
    }
  },
  update: (resource: any, params: any) => {
    if (resource !== "masseur" && resource !== "masseurtype") {
      return myDataProvider.update(resource, params);
    }

    if (resource === "masseur") {
      let formData = new FormData();

      formData.append("occupation", params.data.occupation);
      formData.append("description", params.data.description);
      formData.append("firstName", params.data.firstName);
      formData.append("lastName", params.data.lastName);
      formData.append("file", params.data.file?.rawFile);

      return AdminHttpClient(`${config.baseApiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }: any) => ({
        data: { ...params.data, id: json.id },
      }));
    } else {
      let formData = new FormData();

      formData.append("name", params.data.name);
      formData.append("price", params.data.price);
      formData.append("description", params.data.description);
      formData.append("file", params.data.file?.rawFile);

      return AdminHttpClient(`${config.baseApiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }: any) => ({
        data: { ...params.data, id: json.id },
      }));
    }
  },
};
