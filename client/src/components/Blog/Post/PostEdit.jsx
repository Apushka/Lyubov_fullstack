import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../Modal/Modal';
import styles from './Post.module.css';


const PostEdit = (props) => {
    const { register, handleSubmit, reset } = useForm();

    const [selectedVideos, setSelectedVideos] = useState([]);                       // новые выбранные видео
    const [selectedPhotos, setSelectedPhotos] = useState([]);                       //новые выбранные фото
    const [removedPhotos, setRemovedPhotos] = useState([]);                         //удаленные существующие фото
    const [removedVideos, setRemovedVideos] = useState([]);                         //удаленные существующие видео    
    const [value, setValue] = useState('');
    const [headerMedia, setHeaderMedia] = useState(props.post ? props.post.headerMedia : '');
    const [newHeaderMedia, setNewHeaderMedia] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        reset();
        setValue(props.post ? props.post.category : '')
        setHeaderMedia(props.post ? props.post.headerMedia : '')
    }, [props.post])

    const onSelectedHeaderMediaChange = (e) => {
        setHeaderMedia(e.target.files[0])
        setNewHeaderMedia(e.target.files[0]);
    }

    const onVideoSelected = (e) => {
        setSelectedVideos([...selectedVideos, ...e.target.files]);
    }

    const onPhotoSelected = (e) => {
        setSelectedPhotos([...selectedPhotos, ...e.target.files]);
    }

    const onCreateOrUpdatePost = (formData) => {
        if (!props.post) {
            const newPost = {
                category: formData.category,
                title: formData.title,
                headerMedia: newHeaderMedia,
                body: formData.body,
                image: selectedPhotos,
                video: selectedVideos
            }
            props.createPost(newPost);
            setModal(true);
            reset();
        } else {
            const updatedPost = {
                _id: props.post._id,
                category: formData.category,
                title: formData.title,
                headerMedia: newHeaderMedia,
                body: formData.body,
                image: selectedPhotos,
                video: selectedVideos,
                removedPhotos: removedPhotos,
                removedVideos: removedVideos
            }
            props.updatePost(updatedPost);
            setModal(true);
            reset();
        }
    }

    const onDeletePhotoButton = (e) => {
        const updated = selectedPhotos.filter((element, index) => index !== +e.target.getAttribute('id'))
        setSelectedPhotos([...updated]);
    }

    const onDeleteVideoButton = (e) => {
        const updated = selectedVideos.filter((element, index) => index !== +e.target.getAttribute('id'))
        setSelectedVideos([...updated]);
    }

    const onDeleteExistingPhotoButton = (e) => {
        setRemovedPhotos([...removedPhotos, e.target.getAttribute('id')]);
        e.target.parentElement.className = styles.hidden;
    }

    const onDeleteExistingVideoButton = (e) => {
        setRemovedVideos([...removedVideos, e.target.getAttribute('id')]);
        e.target.parentElement.className = styles.hidden;
    }

    const onDeleteHeaderMedia = (e) => {
        setHeaderMedia('');
        setNewHeaderMedia('deleteAll');
    }

    const handleSelectChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className={styles.post__container}>
            <article className={styles.post}>
                <form onSubmit={handleSubmit(onCreateOrUpdatePost)}>
                    <div className={styles.category__container}>
                        <select id='category' {...register('category')} value={value} onChange={handleSelectChange}>
                            <option value='makeupbag'>Косметичка</option>
                            <option value='life'>Life</option>
                            <option value='all'>Любая</option>
                        </select>
                    </div>
                    <div>
                        <input {...register('title')} className={styles.title__edit} type='text' id='title' defaultValue={props.post ? props.post.title : ''} required placeholder='Enter post title...' />
                    </div>
                    <div className={styles.headerMedia__container}>
                        <div className={styles.headerMedia}>
                            <div className={styles.add__button}>
                                <label htmlFor='headerMedia'></label>
                                {!headerMedia && <i className={styles.placeholder}>Add Header Media here...</i>}
                                <input {...register('headerMedia')} type='file' id='headerMedia' accept='image/jpeg, image/png, video/mp4' onChange={onSelectedHeaderMediaChange} placeholder='Enter post title...' />
                            </div>
                            {!headerMedia.type && (headerMedia.endsWith('.jpg') ||
                                headerMedia.endsWith('.jpeg') ||
                                headerMedia.endsWith('.png')) &&
                                <div>
                                    <img src={headerMedia} />
                                    <span className={styles.delete} onClick={onDeleteHeaderMedia}></span>
                                </div>}

                            {!headerMedia.type && headerMedia.endsWith('.mp4') &&
                                <div className={styles.media}>
                                    <video src={headerMedia} controls='controls' autoPlay muted></video>
                                    <span className={styles.delete} onClick={onDeleteHeaderMedia}></span>
                                </div>}
                            {headerMedia.type && (headerMedia.type.includes('image') && <div className={styles.media}>
                                <img src={URL.createObjectURL(headerMedia)} />
                                <span className={styles.delete} onClick={onDeleteHeaderMedia}></span>
                            </div>)}
                            {headerMedia.type && (headerMedia.type.includes('video') && <div className={styles.media}>
                                <video src={URL.createObjectURL(headerMedia)} controls='controls' autoPlay muted ></video>
                                <span className={styles.delete} onClick={onDeleteHeaderMedia}></span>
                            </div>)}
                        </div>
                    </div>
                    <div className={styles.post__body__container}>
                        <textarea {...register('body')} className={styles.post__body} type='text' id='body' defaultValue={props.post ? props.post.body : ''} placeholder='Write your post here...' />
                    </div>

                    <div className={styles.photo__gallery__container}>
                        <div className={styles.photo__gallery}>
                            <div className={styles.add__button}>
                                <label htmlFor='photo'></label>
                                {!(selectedPhotos.length > 0) && <i className={styles.placeholder}>Add photo here...</i>}
                                <input type='file' id='photo' accept='image/jpeg, image/png' onChange={onPhotoSelected} multiple />
                            </div>
                            {props.post && props.post.photo.map((item) => {
                                return <div key={item} className={styles.photo__container} >
                                    <img src={item} alt='existing' />
                                    <span className={styles.delete} id={item} onClick={onDeleteExistingPhotoButton}></span>
                                </div>
                            })}
                            {selectedPhotos.map((item, index) => {
                                return <div key={item + index} className={styles.photo__container}>
                                    <img src={URL.createObjectURL(item)} alt='selected' />
                                    <span className={styles.delete} id={index} onClick={onDeletePhotoButton}></span>
                                </div>
                            })
                            }
                        </div>
                    </div>
                    <div className={styles.video__gallery__container}>
                        <div className={styles.video__gallery}>
                            <div className={styles.add__button}>
                                <label htmlFor='video'></label>
                                {!(selectedVideos.length > 0) && <i className={styles.placeholder}>Add video here...</i>}
                                <input type='file' id='video' accept='video/mp4' onChange={onVideoSelected} multiple />
                            </div>

                            {props.post && props.post.video.map((item) => {
                                return <div key={item} className={styles.video__container} >
                                    <video src={item} />
                                    <span className={styles.delete} id={item} onClick={onDeleteExistingVideoButton}></span>
                                </div>
                            })}
                            {selectedVideos.map((item, index) => {
                                return <div key={item + index} className={styles.video__container}>
                                    <video src={URL.createObjectURL(item)} />
                                    <span className={styles.delete} id={index} onClick={onDeleteVideoButton}></span>
                                </div>
                            })
                            }
                        </div>
                    </div>
                    <div className={styles.save__button}>
                        <label htmlFor='send'>Отправить</label>
                        <button type='submit' id='send' />
                    </div>
                </form>
            </article>
            {modal && <Modal modal={modal} setModal={setModal}>
                <div className={styles.sent__body}>
                    <span className={styles.thanks}><p>Изменения сохранены</p></span>
                </div>
            </Modal>}
        </div >
    )
}

export default PostEdit;