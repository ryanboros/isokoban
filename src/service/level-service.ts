import Api from "./Api";

const Service = {
  async getLevel(name: string) {
    const response = await Api().get(`${name}.json`);
    return response.data;
  },
};

export default Service;
