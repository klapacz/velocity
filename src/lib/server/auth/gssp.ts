import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { auth } from "./lucia";

export type AuthProps = {
  userId: string;
  email: string;
};
export const gSSPProtected: GetServerSideProps<AuthProps> = async (
  context: GetServerSidePropsContext
) => {
  const authRequest = auth.handleRequest(context);
  const session = await authRequest.validate();
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  // TODO: redirect on unverified email
  return {
    props: {
      userId: session.user.userId,
      email: session.user.email,
    },
  };
};

export const gSSPAnonymous: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const authRequest = auth.handleRequest(context);
  const session = await authRequest.validate();
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
