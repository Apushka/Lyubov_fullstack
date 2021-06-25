import React from 'react';
import styles from './Portfolio.module.css';

const PortfolioEdit = (props) => {
    const onChangePhoto = (e) => {
        props.updatePhoto(e.target.id, e.target.files[0])
    }

    const onAddPhoto = (e) => {
        if (e.target.files[0]) {
            props.addPhoto(e.target.files[0])
            document.getElementById(e.target.id).value = ""
        }
    }

    const onDeletePhoto = (e) => {
        props.deletePhoto(e.target.id);
    }
    return (

        // <div className={styles.portfolio}>
        //     <div className={styles.portfolio__container}>
        //         {props.error && <div className={styles.error}>Возможно, неверный формат файла</div>}
        //         <div className={styles.portfolio__body}>
        //             <div className={styles.galleryEdit}>
        //                 <span className={styles.image}>
        //                     <input type='file' id='addPhoto' accept='.jpeg, .png, .jpg' onChange={onAddPhoto} />
        //                     <label htmlFor='addPhoto' className={styles.addPhoto} ></label>
        //                 </span>
        //                 {props.gallery.map((item, index) => {
        //                     return <span className={styles.image} key={item}>
        //                         <img className={styles.picture} src={item} alt='nothing' />
        //                         <input type='file' id={index} className={styles.input} onChange={onChangePhoto} accept='.jpeg, .png, .jpg'/>
        //                         <label htmlFor={index} className={styles.changePhoto} ></label>
        //                         <span className={styles.deleteButton} id={index} onClick={onDeletePhoto}></span>
        //                     </span>
        //                 })}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className={styles.portfolio}>
            <div className={styles.portfolio__container}>
                <div className={styles.portfolio__body}>
                    <div className={styles.gallery__edit__container}>
                        <span className={styles.add__photo} title='Добавить фото'>
                            <input type='file' id='addPhoto' accept='.jpeg, .png, .jpg' onChange={onAddPhoto} />
                            <label htmlFor='addPhoto' className={styles.addPhoto} >
                            </label>
                        </span>
                        <div className={styles.gallery}>
                            {props.gallery.map((item, index) => {
                                return <div className={styles.image} key={item}>
                                    <img className={styles.picture} src={item} alt='nothing' />
                                    <input type='file' id={index} className={styles.input} onChange={onChangePhoto} accept='.jpeg, .png, .jpg' />
                                    <label htmlFor={index} className={styles.changePhoto} ></label>
                                    <span className={styles.deletePhoto} id={index} onClick={onDeletePhoto}></span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioEdit;