import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
export const TitleFieldTop = () => {
  return (
    <Card className="w-3/4">
      <CardHeader className="flex gap-3">
        <p className="font-bold text-xl">
          Convert song's lyrics and chords to Json format
        </p>
      </CardHeader>
      <Divider />
      {/* <CardBody>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">歡迎! </p>
          <p className="text-lg font-bold">
            這是一個幫助我們將新慕道之路的歌曲從文字轉換成Json格式 !
          </p>
         
        </div>
      </CardBody> */}
    </Card>
  );
};
