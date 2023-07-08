import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../server/auth";

export default function SignIn({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-96 p-8 bg-stone-600 rounded-lg shadow-md transform hover:shadow-xl">

        <div className="flex justify-center gap-5 ">
          {Object.values(providers).map((provider) => (
            (provider.name === "Google" || provider.name === "Twitter") && (
          <div key={provider.name}>
                {provider.name === "Google" && (
                  <button
                  key={provider.name}
                  className="text-white bg-[#4285F4] hover:bg-[#3A558E]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-2 pt-1 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  border-b-8 border-[#3A558E]"
                  onClick={() => signIn(provider.id)}
                >
                  <svg className="w-4 h-4 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                  </svg>
                </button>
                
                )}
                {provider.name === "Twitter" && (
                  <button
                  key={provider.name}
                  className="text-white bg-[#1da1f2] hover:bg-[#03394F]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-2 pt-1 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  border-b-8 border-[#03394F]"
                  onClick={() => signIn(provider.id)}
                >
                  <svg className="w-4 h-4 m-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                  </svg>
                </button>
                
                )}
          </div>
           
            )
          ))}
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">OR</span>
        </div>
        <form method="post" action="/api/auth/signin/email">
  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
  <label className="block mb-4 text-white">
    <input className="w-full mt-2 px-4 py-2 bg-gray-200 rounded-md text-stone-800" type="email" id="email" name="email" placeholder="Email Address" />
  </label>
  <button className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center space-x-2">
  <svg className="w-4 h-4 text-yellow-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2" />
    <path d="M12 21v2" />
    <path d="M4.22 4.22l1.42 1.42" />
    <path d="M18.36 18.36l1.42 1.42" />
    <path d="M1 12h2" />
    <path d="M21 12h2" />
    <path d="M4.22 19.78l1.42-1.42" />
    <path d="M18.36 5.64l1.42-1.42" />
  </svg>
  <span>Sign in with Email</span>
</button>




</form>


      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers: providers ?? [], csrfToken },
  };
}
