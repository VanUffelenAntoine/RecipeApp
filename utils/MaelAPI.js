import axios from 'axios';

export const getMealById = async (mealId) => {
    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        // Handle the response data here
        console.log(response.data);
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
};

export const getRandomMeal = async () => {
    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/random.php`
        );
        console.log(response.data.meals[0]);
        return response.data.meals[0];
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
};

export const getMealsByCategory = async (category) => {
    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        console.log(response.data.meals);
        return response.data.meals;
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
};

export const getRandomMeals = async () => {
    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/randomselection.php`
        );
        // Handle the response data here
        console.log(response.data);
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/categories.php`
        );
        // Handle the response data here
        console.log(response.data.categories);
        return response.data.categories;
    } catch (error) {
        // Handle any errors
        console.error(error);
    }
};