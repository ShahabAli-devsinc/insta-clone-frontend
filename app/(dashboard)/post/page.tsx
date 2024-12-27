"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import PostSubmitButton from "./components/PostSubmitButton";
import PostInputField from "./components/PostInputField";
import { PostFormValues } from "@/types/types";
import { toast } from "sonner";
import { PostApi } from "@/services/postApi";
import Image from "next/image";
import { WEBSITE_LOGO } from "@/constants/constants";

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
      toast.success("Post created successfully!", {
        style: {
          color: "black",
        },
      });
      actions.resetForm();
      setPreview(null);
      setStep(1);
    } catch (error) {
      toast.error("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = (
    step: number,
    setFieldValue: (field: string, value: string | File | null) => void,
    values: PostFormValues
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
          <div className="space-y-6 p-6 bg-gray-100 rounded-xl shadow-lg">
            {/* <h3 className="text-2xl font-semibold text-blue-500 text-center">
              Review Your Post
            </h3> */}
            <div className="flex flex-col items-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="object-contain rounded-md h-64 w-full max-w-lg shadow-md mb-4"
                />
              ) : null}
              <div className="w-full flex gap-2 items-center max-w-lg bg-white p-3 rounded-lg shadow-lg">
                <h4 className="text-xl font-medium text-gray-800">Caption:</h4>
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 sm:p-8">
      <div className="w-full max-w-2xl bg-white p-8 pt-0 rounded-xl shadow-2xl text-gray-800">
        <div className="flex flex-col items-center mb-2">
          <Image
            className="w-40"
            width={100}
            height={50}
            src={WEBSITE_LOGO}
            alt="instagram"
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={PostSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            values,
          }: {
            setFieldValue: (field: string, value: string | File | null) => void;
            values: PostFormValues;
            resetForm: () => void;
            isValid: boolean;
            dirty: boolean;
          }) => (
            <Form className="space-y-8">
              {/* Step Indicators */}
              <div className="flex justify-center mb-8 space-x-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                        step === s
                          ? "bg-blue-500 text-white scale-110 shadow-lg"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && <div className="h-1 w-10 bg-gray-300"></div>}
                  </div>
                ))}
              </div>

              {/* Render Current Step */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {renderStep(step, setFieldValue, values)}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
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
                    className={`px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
                      (step === 1 && !values.imageUrl) ||
                      (step === 2 && !values.caption)
                        ? "bg-blue-500 text-white opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105"
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
