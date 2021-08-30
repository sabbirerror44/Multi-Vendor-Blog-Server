//get Auth
async function getDashboard(req, res, next) {
    res.send('Dashboard Page');
}
//Create Profile
async function createProfile(req, res, next) {
    const  {
      name,
      bio,
      title,
      website,
      facebook,
      youtube,
      github,

    } = req.body

    let profile = new Profile({
      user:req.user._id,
      name,
      bio,
      title,
      profilePics:req.user.profilePics,
      links:{
        website:website || '',
        facebook:facebook || '',
        youtube:youtube || '',
        github:github || '',

      },
      post:[],

    })

    try {
      let createprofile = await profile.save()
      await User.findOneAndUpdate(
        {_id:req.user._id},
        {
          $set: {
            profile:createprofile._id
          }
        }
      )
      res.status(200).json({
        message: "Profile created successfully!",
      });  
    } catch (err) {
        res.status(500).json({
            errors: {
              common: {
                msg: err.message,
              },
            },
          });
      
    }
   
}

//Edit Profile
async function editProfile(req, res, next){
    let {name,bio,title,website,facebook,youtube,github} = req.body
    let profile= {
      name,
      bio,
      title,
      links:{
        website:website || '',
        facebook:facebook || '',
        youtube:youtube || '',
        github:github || '',
      }
    }
    try {
        await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$set:profile}
          )
          res.status(200).json({
            message: "Profile updated successfully!",
          });  
    } catch (err) {
        res.status(500).json({
            errors: {
              common: {
                msg: err.message,
              },
            },
          });
    }
     

}

module.exports = {
    getDashboard,
    createProfile,
    editProfile,
}