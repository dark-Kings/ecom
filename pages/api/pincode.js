export default function handler(req, res) {
  
    let pincodes={
      "249202":["Rishikesh","Uttrakhand"],
      "246195":["Pantnagar","Uttrakhand"]
    }

    res.status(200).json(pincodes)
  }