// import axios from "axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "@/constants/custom-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`api/v1/groups/startpoint/nonhost`);
  const { groupId, stationName, lat, lng } = req.body.value;
  const header = req.headers;

  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/${groupId}/group-members`;

  try {
    const { data } = await axios({
      method: "post",
      url: requestUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${header.authorization}`,
      },
      data: {
        stationName: stationName,
        lat: lat,
        lng: lng,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorCode = err.response?.data.errorCode;

      if (CustomError[errorCode]) {
        res.status(CustomError[errorCode].status).json({
          error: CustomError[errorCode].message,
          status: CustomError[errorCode].status,
        });
      } else {
        console.log(err);
        res.status(400).json({
          error: "api/v1/groups/startpoint/host patch fail",
          status: 400,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
