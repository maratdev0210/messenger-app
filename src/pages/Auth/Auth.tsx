import Form from "../../widgets/Auth/Form";

export default function Auth() {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <div>
          <p className="text-2xl font-semibold text-center">
            Добро пожаловать в Messenger
          </p>
          <img
            className="mx-auto size-14 mt-4 animate-image-load"
            src="https://scontent-fra3-2.xx.fbcdn.net/v/t39.8562-6/475210330_598195142840489_9172482348551739153_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=nYmE1rRsBqMQ7kNvgFiCAI8&_nc_oc=Adlu-ApbfbLuVEYcgL9BG9ZP7ik0_CvP8uZGjSYzxtjxFZjPrRb3l-qDM5RI7eG0NUA&_nc_zt=14&_nc_ht=scontent-fra3-2.xx&_nc_gid=lgJdM3HgJVQOUpwVFqMMLw&oh=00_AYGnxtueZbmXkayaAOkoojEhZbtqGAXQCMDqhKj847GQzA&oe=67EEECD8"
          />
        </div>
        <div className="w-full mt-16">
          <Form />
        </div>
      </div>
    </>
  );
}
