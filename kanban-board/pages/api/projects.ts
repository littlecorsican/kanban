import models from "../../models";


const handler = async(req, res)=> {

  if (req.method === 'GET') {

    try {

        models.projects.findAll()
        .then((response)=>{
            console.log(response)
            return res.status(200).json({
                status: "success",
                message: "success",
                data : response
                });
        })


          

    } catch(err) {
      return res.status(500).json({
        status: "error",
        message: "error",
        data : err
      });
    }

  } else { // no POST, not needed
  }
}


export default handler



