import axios from "axios";
import {
  INICIATIVAS_AMBITOS_API_URL,
  INICIATIVAS_API_URL,
  PER_PAGE_POSTS,
  PER_PAGE_POSTS_AND,
  WP_FETCH_HEADERS,
} from "./constants";


//funcion que remueve acentos en un parrafo
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

export const getNumPosts = async () => {
  const { headers } = await axios(
    `${INICIATIVAS_API_URL}${PER_PAGE_POSTS}`,
    WP_FETCH_HEADERS
  );
  return headers["x-wp-totalpages"];
};

export const getNumPostsByCategory = async (categoryId) => {
  const { headers } = await axios(
    `${INICIATIVAS_API_URL}?ambito=${categoryId}${PER_PAGE_POSTS_AND}`,
    WP_FETCH_HEADERS
  );
  return headers["x-wp-totalpages"];
};

export const fetchPosts = async (numPages) => {
  const posts = [];
  var returnPosts = [];

  for (let page = 1; page <= numPages; page += 1) {
    const post = axios.get(
      `${INICIATIVAS_API_URL}${PER_PAGE_POSTS}&page=${page}`,
      WP_FETCH_HEADERS
    );
    posts.push(post);
  }

  await axios
    .all(posts)
    .then((response) => {
      const postData = response.map((res) => res.data);
      returnPosts = postData.flat();
    })
    .catch((e) => console.log("error fetching posts: ", e));

  return returnPosts;
};

export const fetchPostsByCategory = async (categorySlug) => {
  const posts = [];
  var returnPosts = [];

  var categoryId = await getIniciativasCategoryIDFromServer(categorySlug);
  var numPages = await getNumPostsByCategory(categoryId);

  for (let page = 1; page <= numPages; page += 1) {
    const post = axios.get(
      `${INICIATIVAS_API_URL}?ambito=${categoryId}${PER_PAGE_POSTS_AND}&page=${page}`,
      WP_FETCH_HEADERS
    );
    posts.push(post);
  }

  await axios
    .all(posts)
    .then((response) => {
      const postData = response.map((res) => res.data);
      returnPosts = postData.flat();
    })
    .catch((e) => console.log("error fetching posts: ", e));

  return returnPosts;
};

export const getAllIniciativasFromServer = async () => {
  try {
    const { data } = await axios.get(INICIATIVAS_API_URL);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllIniciativasAllDataFromServer = async () => {
    try {
      const { data } = await axios.get(
        `${INICIATIVAS_API_URL}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
};

export const getAllIniciativasByCategoryFromServer = async (categorySlug) => {
  if (categorySlug != "") {
    var categoryId = await getIniciativasCategoryIDFromServer(categorySlug);

    if (categoryId != "") {
      try {
        const { data } = await axios.get(
          `${INICIATIVAS_API_URL}?ambito=${categoryId}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

/*
export const getAllIniciativasByCategoryNameFromServer = async (categoryName) => {
  if (categoryName != "") {
    try {
      const { data } = await axios.get(
        `${INICIATIVAS_API_URL}?name=${categoryName}`
      );
      let searchData = [];
      data.map((list) => {
        if(list.acf.palabras_clave){
          list.acf.palabras_clave.map((item)=>{
              if(item.name.toUpperCase() === categoryName.toUpperCase()) searchData.push(list);
          })
        }
      });
      return searchData;
    } catch (error) {
      console.log(error);
    }
  } else {
    return [];
  }
};*/

export const getAllIniciativasByCategoriesFromServer = async (
  categoriesSlug
) => {
  var iniciativas = [];

  categoriesSlug.forEach(async (slug) => {
    var iniciativa = await getAllIniciativasByCategoryFromServer(slug);
    iniciativas.push(iniciativa);
  });

  return iniciativas;
};

export const getIniciativasCategoryIDFromServer = async (categorySlug) => {
  try {
    const { data } = await axios.get(
      `${INICIATIVAS_AMBITOS_API_URL}?slug=${categorySlug}`
    );

    if (data && data.length > 0) {
      return data[0].id;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
};