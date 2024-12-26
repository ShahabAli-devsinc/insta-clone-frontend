"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PostSubmitButton from "./components/PostSubmitButton";
import PostInputField from "./components/PostInputField";
import { PostFormValues } from "@/types/types";
import { toast } from "sonner";
import { PostApi } from "@/services/postApi";

const PostSchema = Yup.object().shape({
  caption: Yup.string().required("Caption is required"),
  imageUrl: Yup.mixed().required("Image is required"),
});

const Post = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const initialValues: PostFormValues = {
    caption: "",
    imageUrl: null,
  };

  const handleSubmit = async (
    values: PostFormValues,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    const postData = new FormData();
    if (values.imageUrl) postData.append("file", values.imageUrl);
    if (values.caption) postData.append("caption", values.caption);
    try {
      await PostApi.create(postData);
      toast("Post created successfully!");
      actions.resetForm();
      setPreview(null);
      setStep(1);
    } catch (error) {
      toast("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated renderStep with specific types and reordered steps
  const renderStep = (
    step: number,
    setFieldValue: (field: string, value: string | File | null) => void,
    values: PostFormValues,
    setPreview: (value: string | null) => void
  ) => {
    switch (step) {
      case 1:
        return (
          <PostInputField
            label="Image Upload"
            name="imageUrl"
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.currentTarget?.files?.[0] || null;
              setFieldValue("imageUrl", file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              } else {
                setPreview(null);
              }
            }}
            preview={preview}
            setPreview={setPreview}
          />
        );
      case 2:
        return (
          <PostInputField
            label="Caption"
            name="caption"
            as="textarea"
            rows={4}
            placeholder="Write your caption here..."
          />
        );
      case 3:
        return (
          <div className="space-y-6 p-4 bg-gray-50 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-600 text-center">
              Review Your Post
            </h3>
            <div className="flex flex-col items-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-lg object-cover h-64 w-full max-w-md shadow-md mb-4"
                />
              ) : null}
              <div className="w-full max-w-md bg-white p-4 rounded-lg shadow">
                <h4 className="text-xl font-medium text-gray-800 mb-2">
                  Caption
                </h4>
                <p className="text-gray-700">{values.caption}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-8">
          Create a <span className="text-indigo-600">New</span> Post
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={PostSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            values,
            resetForm,
            isValid,
            dirty,
          }: {
            setFieldValue: (field: string, value: string | File | null) => void;
            values: PostFormValues;
            resetForm: () => void;
            isValid: boolean;
            dirty: boolean;
          }) => (
            <Form className="space-y-6">
              {/* Step Indicators */}
              <div className="flex justify-center mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step === s
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Render Current Step */}
              {renderStep(step, setFieldValue, values, setPreview)}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-colors duration-300"
                  >
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !values.imageUrl) ||
                      (step === 2 && !values.caption)
                    }
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300 ${
                      (step === 1 && !values.imageUrl) ||
                      (step === 2 && !values.caption)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <PostSubmitButton
                    text={isSubmitting ? "Uploading..." : "Create Post"}
                    isLoading={isSubmitting}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Post;
