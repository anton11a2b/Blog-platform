import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import scheme from './validation';
import { parseStrings, parseObjects } from '../../helpers/helpers';
import { createArticle, editArticle } from '../../redux/actions/actionCreators';

import classes from './createArticle.module.scss';

const CreateArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state;
  const tagList = article ? article.tagList : [];
  const { authErrors } = useSelector((state) => state);
  const title = article ? (
    <h2 className={classes.title}>Edit article</h2>
  ) : (
    <h2 className={classes.title}>Create new article</h2>
  );
  const {
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(scheme),
    defaultValues: { tagList: parseObjects(tagList) },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (data) => {
    const tagList = parseStrings(data.tagList);
    const newData = { ...data, tagList };
    if (slug) {
      dispatch(editArticle(newData, slug, () => navigate('/', { replace: true })));
    } else {
      dispatch(createArticle(newData, () => navigate('/', { replace: true })));
    }
  };

  useEffect(() => {
    if (authErrors) {
      Object.keys(authErrors).forEach((key) => {
        setError(key, {
          type: 'manual',
          message: `The ${key} must be unique`,
        });
      });
    }
  }, [authErrors, setError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {title}
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Title
            <input
              type="text"
              name="title"
              placeholder="Title"
              {...register('title')}
              defaultValue={article?.title}
              className={errors.title ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.title?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Short description
            <input
              type="text"
              name="description"
              {...register('description')}
              placeholder="Short description"
              defaultValue={article?.description}
              className={errors.description ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.description?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Text
            <textarea
              name="body"
              placeholder="Text"
              {...register('body')}
              defaultValue={article?.body}
              className={errors.body ? classes.articleBodyError : classes.articleBody}
            />
          </label>
          <p className={classes.error}>{errors?.body?.message}</p>
        </div>
        <span className={classes.inputName}>Tag</span>
        <div className={classes.tagListWrapper}>
          <ul className={classes.tagList}>
            {fields.map((item, index) => (
              <li key={item.id}>
                <input {...register(`tagList.${index}.tag`)} placeholder="Tag" className={classes.tag} />
                <button type="button" onClick={() => remove(index)} className={classes.btnDelete}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => append({ tag: '' })} className={classes.btnAddTag}>
            Add tag
          </button>
        </div>
        <button type="submit" className={classes.btnCreate} disabled={!isDirty || !isValid}>
          Create
        </button>
      </form>
    </>
  );
};

export default CreateArticle;
