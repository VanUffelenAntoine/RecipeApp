import axios from 'axios';

const fetchData = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
}

export const getMealById = async (mealId) => {
    console.log('Fetching meal with id: '+mealId)
    const responseData = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    return responseData.data.meals[0];
};

export const getRandomMeal = async () => {
    const responseData = await fetchData(`https://www.themealdb.com/api/json/v1/1/random.php`);
    return responseData.data.meals[0]
};

export const getMealsByCategory = async (category) => {
    const url =`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const responseData = await fetchData(url);
    return responseData.data.meals;
};

export const getRandomMeals = async () => {
    const responseData = await fetchData(`https://www.themealdb.com/api/json/v1/1/randomselection.php`);
    return responseData;

};

export const getSignleCategory = async () => {
    const responseData = await fetchData(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const categorys = responseData.data.categories;
    const random = Math.floor(Math.random() * responseData.data.categories.length);
    return await categorys[random];
};

export const getCategories = async () => {
    const responseData = await fetchData(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    return responseData.data.categories;
};