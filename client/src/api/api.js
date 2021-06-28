import * as axios from 'axios';

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/api/'
// })

export const authAPI = {
    login(formData) {
        return axios.post('/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response;
            })
    },
    logout(email) {
        return axios.delete(`/api/auth/login?email=${email}`)
            .then(response => {
                return response;
            })
    }
}


export const aboutAPI = {
    getAbout() {
        return axios.get('/api/about')
            .then(response => {
                return response;
            })
    },
    updateAbout(AboutMe) {
        return axios.patch('/api/about', AboutMe, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then(response => {
                return response;
            })
    }
}

export const portfolioAPI = {
    getPorfolio() {
        return axios.get('/api/portfolio')
            .then(response => {
                return response.data.imageSrc;
            })
    },
    addPhoto(photo) {
        const formData = new FormData();
        formData.append('image', photo);
        return axios.put('/api/portfolio', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('token')
            }
        })
    },
    updatePhoto(photoId, photo) {
        const formData = new FormData();
        formData.append('id', photoId);
        formData.append('image', photo);
        return axios.patch('/api/portfolio', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('token')
            }
        })
    },

    deletePhoto(photoId) {
        return axios.delete(`/api/portfolio?id=${photoId}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then(response => {
                return response;
            })
    }
}

export const blogAPI = {
    getBlog(currentPage, pageSize, category) {
        return axios.get(`/api/blog?category=${category}&page=${currentPage}&limit=${pageSize}`)
            .then(response => {
                return response;
            })
    },
    getPost(postId) {
        return axios.get(`/api/blog/post/?postId=${postId}`)
            .then(response => {
                return response;
            })
    },

    createPost(post) {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('headerMedia', post.headerMedia)
        formData.append('date', post.date);
        formData.append('body', post.body);
        formData.append('category', post.category);

        for (let i = 0; i < post.image.length; i++) {
            formData.append('image', post.image[i]);
        }
        Array.prototype.forEach.call(post.video, video => formData.append('video', video));

        return axios.put(`/api/blog/post?postId=${'create'}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('token')

            }
        })
            .then(response => {
                return response;
            })
    },
    deletePost(postId) {
        return axios.delete(`/api/blog/post?postId=${postId}`, {
            headers: {
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then(response => {
                return response;
            })
    },
    updatePost(post) {
        const formData = new FormData();
        formData.append('title', post.title)
        formData.append('category', post.category)
        formData.append('headerMedia', post.headerMedia)
        formData.append('body', post.body)
        formData.append('date', post.date)
        formData.append('_id', post._id)
        formData.append('removedPhotos', post.removedPhotos)
        formData.append('removedVideos', post.removedVideos)

        post.image.forEach(e => formData.append('image', e));
        post.video.forEach(e => formData.append('video', e));

        return axios.patch(`/api/blog/post?postId=${post._id}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': sessionStorage.getItem('token')

            }
        })
            .then(response => {
                return response;
            })
    }
}

export const contactsAPI = {
    sendMessage(message) {
        return axios.post('/api/contacts/send', message)
            .then(response => {
                return response
            })
    }
}


