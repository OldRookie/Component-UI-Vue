import Mock from "mockjs";
import { param2Obj } from "@/utils";

const list = [];
const count = 100;

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: "@increment",
      userName: "userName" + "@integer(300, 5000)",
      email: "email@email.com",
      acount: "acount" + "@integer(300, 5000)",
      createDate: "@datetime"
    })
  );
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(
      config.url
    );

    let mockList = list.filter(item => {
      if (importance && item.importance !== +importance) return false;
      if (type && item.type !== type) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      return true;
    });

    if (sort === "-id") {
      mockList = mockList.reverse();
    }

    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );

    return {
      total: mockList.length,
      items: pageList
    };
  },
  getPv: () => ({
    pvData: [
      { key: "PC", pv: 1024 },
      { key: "mobile", pv: 1024 },
      { key: "ios", pv: 1024 },
      { key: "android", pv: 1024 }
    ]
  }),
  get: config => {
    const { id } = param2Obj(config.url);
    for (const article of list) {
      if (article.id === +id) {
        return article;
      }
    }
  },
  create: () => ({
    data: "success"
  }),
  update: () => ({
    data: "success"
  })
};
