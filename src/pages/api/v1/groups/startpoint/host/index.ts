// import axios from "axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { memberId } = req.body.value;
  const { groupId } = req.body.value;
  const { stationName } = req.body.value;
  console.log(stationName);
  const { lat } = req.body.value;
  const { lng } = req.body.value;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/${groupId}/host?memberId=${memberId}`;

  console.log(`api/v1/groups/startpoint/host${req.body}`);
  try {
    const { data } = await axios({
      method: "patch",
      url: requestUrl,
      data: {
        stationName: "마두역",
        lat: lat,
        lng: lng,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      res.status(400).json({
        error: "NEXT API CALL ERROR",
        status: e.response?.data.errorCode,
      });
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
