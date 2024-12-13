import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
export const TitleFieldTop = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <p className="font-bold text-xl">
          Convert songs lyrics and chords to Json
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">歡迎! </p>
          <p className="text-lg font-bold">
            這是一個幫助我們將新慕道之路的歌曲從文字轉換成Json格式 !
          </p>
          {/* <Divider />
          <p className="text-md font-bold">Welcome! </p>
          <p className="text-md font-bold">
            This is an application to help us convert Neaocathecumenal way's
            songs from text to Json format!
          </p> */}
        </div>
      </CardBody>
    </Card>
  );
};
