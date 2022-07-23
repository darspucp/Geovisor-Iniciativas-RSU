import axios from "axios";
import {
  INICIATIVAS_AMBITOS_API_URL,
  INICIATIVAS_API_URL,
  PER_PAGE_POSTS,
  PER_PAGE_POSTS_AND,
  WP_FETCH_HEADERS,
} from "./constants";


//funcion que obtiene el total de posts "Iniciativas"
const getAllPosts = async () => {
  const numberPages = await getNumPosts();
  const totalPosts = await fetchPosts(numberPages);
  return totalPosts;
};

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

export const fetchPostsIniciativas = async (numPages) => {
  const posts = [];
  var returnPosts = [];

  for (let page = 1; page <= numPages; page += 1) {
    const post = axios.get(
      `${INICIATIVAS_API_URL}${PER_PAGE_POSTS}&page=${page}`,
      WP_FETCH_HEADERS
    );
    /*
    const postData = posts.filter((post) => {
          if(post.acf.palabras_clave){
            console.log(post.title.rendered);
          }
    });*/
    posts.push(post);
  }
  /*
    await axios
      .all(posts)
      .then((response) => {
        const postData = response.map((res) => res.data);
        returnPosts = postData.flat();
      })
      .catch((e) => console.log("error fetching posts: ", e));
  */
  return posts;
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

  console.log(posts);

  await axios
    .all(posts)
    .then((response) => {
      const postData = response.map((res) => res.data);
      returnPosts = postData.flat();
    })
    .catch((e) => console.log("error fetching posts: ", e));

  return returnPosts;
};

export const fetchPostsByText = async (categorySlug) => {
  const posts = [];
  var returnPosts = [];

  var categoryId = await getIniciativasCategoryIDFromServer(categorySlug);
  var numPages = await getNumPostsByCategory(categoryId);

  for (let page = 1; page <= numPages; page += 1) {
    const post = axios.get(
      `${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`,
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
  console.log(returnPosts);
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


export const getAllIniciativasByCategoryNameFromServer = async (categoryName) => {
  if (categoryName != "") {
    try {
      let searchData = [];
      let cleanData = [];
      const pagesNum = await getNumPosts();
      for (let page = 1; page <= pagesNum; page += 1) {
        const { data } = await axios.get(`${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`, WP_FETCH_HEADERS)
        //console.log(data);
        data.map((post) => {
          if (post?.acf?.palabras_clave) {
            Object.values(post?.acf?.palabras_clave)?.map((item) => {
              if (item.name.includes(categoryName)) {
                  searchData.push(post);
              }
            })
          }
        });
      }
      let hash = {};
      let arrayFilter = searchData.filter( elem => hash[elem.id]?false:hash[elem.id]=true)
      return arrayFilter;
    } catch (error) {
      console.log(error);
    }
  } else {
    return [];
  }
};

export const getIniciativasByKeyWord = async (keyword) => {

  if (keyword != "") {
    try {
      let searchData = [];
      const pagesNum = await getNumPosts();
      for (let page = 1; page <= pagesNum; page += 1) {
        const { data } = await axios.get(`${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`, WP_FETCH_HEADERS)
        data.map((list) => {
          //console.log(list.acf.titulo);
          if (list.acf.palabras_clave) {
            list.acf.palabras_clave.map((item) => {
              if (item.name.toUpperCase() === keyword.toUpperCase()) {
                searchData.push(list);
                //	console.log(ite.acf.titulo);
              }
            })
          }
        })
      }
      console.log(searchData);
      return searchData;
    } catch (error) {
      console.log(error);
    }
  }
}

export const obtenerIniciativas = async () => {
  const posts = [];
  var returnPosts = [];
  try {
    const pagesNum = await getNumPosts();

    for (let page = 1; page <= pagesNum; page += 1) {
      const respuesta = await axios.get(`${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`, WP_FETCH_HEADERS)
      posts.push(respuesta);
    }
    await axios
      .all(posts)
      .then((response) => {
        const postData = response.map((res) => res.data);
        returnPosts = postData.flat();
      })
      .catch((e) => console.log("error fetching posts: ", e));

    return returnPosts;
    //return respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllIniciativas() {
  const all_iniciativas = await obtenerIniciativas();
  //console.log(all_iniciativas);
  all_iniciativas.filter((iniciativa) => {
    iniciativa.acf.ambito === 18
    //console.log(iniciativa.acf.titulo);

  })
  return all_iniciativas;
}

export const getIniciativasFilterByKeyWord = async (search_text) => {
  let numPages = 20
  for (let page = 1; page <= numPages; page += 1) {

    const post = axios.get(
      `${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`,
      WP_FETCH_HEADERS
    );
    console.log(post);

  }
}

/*
export const getAllIniciativasByCategoryNameFromServer = async (categoryName) => {
  if (categoryName != "") {
    try {
      //console.log(`${INICIATIVAS_API_URL}?name=${categoryName}`);
     // console.log('Hola marciano abcd');
    // let totalPage = await getAllPosts();
     //console.log(totalPage);
      let numPages = 20
     let searchData = [];
     
          const { data } = await axios.get(
            `${INICIATIVAS_API_URL}?name=${categoryName}`
           // `${INICIATIVAS_API_URL}?${PER_PAGE_POSTS_AND}&page=${page}`
          );
            console.log(data);
              data.map((list) => {
                console.log('hola');
                if(list.acf.palabras_clave){
                  list.acf.palabras_clave.filter((item)=>{
                    let itemName = removeAccents(item.name);
                  let textFilter = removeAccents(categoryName);
                      if(itemName.toUpperCase().includes(textFilter.toUpperCase())) searchData.push(list);
                  })
                }
              });
            console.log(searchData);
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