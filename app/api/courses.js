import http from './index'

export const fetchCourses = async () => {
    try {
        const { data: { courses } } = await http.get(`${http.url}/courses`)
        return courses
    } catch (err) {
        console.log(err);
    }
}