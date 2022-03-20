import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  ContainerInput,
  ContainerPhoto,
  ContainerText,
  Footer,
  StyledForm,
  StyledBlueButton,
  StyledButton,
  StyledDetailsText,
  FormSection,
  StyledImage,
  HalfWidthInput,
  StyledSpan,
  StyledSubTitle,
  Wrapper,
  AvatarSection,
} from "./styled";
import { useEffect, useState } from "react";
import { retrieveUser, updateUserAndPassword } from "../../api/";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { convertToBase64 } from "./utils";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [user, setUser] = useState({});
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
  });
  const avatar = acceptedFiles[0];
  const avatarSrc = avatar && URL.createObjectURL(avatar);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ reValidateMode: "onBlur" });

  const navigate = useNavigate();
  useEffect(() => {
    try {
      retrieveUser(sessionStorage.token)
        .then((user) => {
          setUser(user);
          reset({
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
          });
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (values) => {
    const {
      name,
      email,
      location,
      phone,
      currPassword,
      newPassword,
      retypePassword,
    } = values;

    try {
      if (avatar) {
        convertToBase64(avatar).then((avatar) => {
          updateUserAndPassword({
            currPassword,
            newPassword,
            retypePassword,
            name,
            email,
            location,
            phone,
            avatar,
          });
        });
      } else {
        updateUserAndPassword({
          currPassword,
          newPassword,
          retypePassword,
          name,
          email,
          location,
          phone,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <AvatarSection>
          <ContainerPhoto {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledImage
              src={avatarSrc ? avatarSrc : user.avatar}
              alt="photo"
            />
          </ContainerPhoto>
        </AvatarSection>
        <FormSection>
          <Wrapper>
            <ContainerText>
              <StyledDetailsText>Contact Details</StyledDetailsText>
              <StyledSpan>
                Introduce your contact details so companies can reach back to
                you
              </StyledSpan>
            </ContainerText>
            <ContainerInput>
              <Input
                type="text"
                {...register("name", { required: "This field is required" })}
                placeholder="Name"
                error={errors.name?.message}
              />
              <Input
                type="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="email"
                error={errors.email?.message}
              />
            </ContainerInput>
            <ContainerInput>
              <Input
                type="tel"
                {...register("phone", {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9\s]*$/,
                    message: "Enter a valid phone",
                  },
                })}
                placeholder="Phone"
                error={errors.phone?.message}
              />
              <Input
                type="text"
                {...register("location", {
                  required: "This field is required",
                })}
                placeholder="Location"
                error={errors.location?.message}
              />
            </ContainerInput>
          </Wrapper>
          <Wrapper>
            <StyledSubTitle>Modify your user settings</StyledSubTitle>
            <ContainerInput>
              <HalfWidthInput
                type="password"
                {...register("currPassword", {
                  validate: {
                    requiredPassword: (value) => {
                      if (
                        !value &&
                        (!!getValues("newPassword") ||
                          !!getValues("retypePassword"))
                      )
                        return "This field is required";
                      return true;
                    },
                  },
                })}
                placeholder="Current Password"
                error={errors.currPassword?.message}
              />
            </ContainerInput>
            <ContainerInput>
              <Input
                type="password"
                {...register("newPassword", {
                  validate: {
                    requiredNewPassword: (value) => {
                      if (
                        !value &&
                        (!!getValues("currPassword") ||
                          !!getValues("retypePassword"))
                      )
                        return "This field is required";
                      return true;
                    },
                    matchRetypePassword: (value) => {
                      if (
                        !!value &&
                        !!getValues("retypePassword") &&
                        value !== getValues("retypePassword")
                      )
                        return "New password and retype password must match";
                      return true;
                    },
                  },
                })}
                placeholder="New Password"
                error={errors.newPassword?.message}
              />
              <Input
                type="password"
                {...register("retypePassword", {
                  validate: {
                    requiredRetypePassword: (value) => {
                      if (
                        !value &&
                        (!!getValues("currPassword") ||
                          !!getValues("newPassword"))
                      )
                        return "This field is required";
                      return true;
                    },
                    matchNewPassword: (value) => {
                      if (
                        !!value &&
                        !!getValues("newPassword") &&
                        value !== getValues("newPassword")
                      )
                        return "New password and retype password must match";
                      return true;
                    },
                  },
                })}
                placeholder="Retype Password"
                error={errors.retypePassword?.message}
              />
            </ContainerInput>
          </Wrapper>
          <Footer>
            <StyledBlueButton>Update profile</StyledBlueButton>
            <StyledButton
              onClick={() => {
                navigate("/board");
              }}
            >
              Cancel
            </StyledButton>
          </Footer>
        </FormSection>
      </StyledForm>
    </Layout>
  );
};

export default Profile;
