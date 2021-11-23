/* eslint-disable react/self-closing-comp */
import React from 'react';

import classes from './createArticle.module.scss';

const CreateArticle = () => (
  <>
    <form className={classes.form}>
      <h2 className={classes.title}>Create new article</h2>
      <div className={classes.inputWrapper}>
        <span className={classes.inputName}>Title</span>
        <input
          type="text"
          name="articleTitle"
          placeholder="Title"
          // className={errors.email ? classes.inputFieldError : classes.inputField}
          // {...register('email')}
        />
        {/* {errors.email && <p className={classes.error}>{errors.email.message}</p>} */}
      </div>
      <div className={classes.inputWrapper}>
        <span className={classes.inputName}>Short description</span>
        <input
          type="text"
          name="articleDescription"
          placeholder="Short description"
          // className={errors.email ? classes.inputFieldError : classes.inputField}
          // {...register('email')}
        />
        {/* {errors.email && <p className={classes.error}>{errors.email.message}</p>} */}
      </div>
      <div className={classes.inputWrapper}>
        <span className={classes.inputName}>Text</span>
        <textarea placeholder="Text" name="articleBody"></textarea>
        {/* <input
          className={errors.email ? classes.inputFieldError : classes.inputField}
          {...register('email')}
        /> */}
        {/* {errors.email && <p className={classes.error}>{errors.email.message}</p>} */}
      </div>
      <div className={classes.inputWrapper}>
        <span className={classes.inputName}>Tags</span>
        <input
          type="text"
          name="tags"
          placeholder="Tag"
          // className={errors.email ? classes.inputFieldError : classes.inputField}
          // {...register('email')}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tag"
          // className={errors.email ? classes.inputFieldError : classes.inputField}
          // {...register('email')}
        />
        {/* {errors.email && <p className={classes.error}>{errors.email.message}</p>} */}
      </div>
    </form>
  </>
);

export default CreateArticle;
