import React, { useContext, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserData } from "../context/userDataContext";
import dp from "../assets/dp.webp";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoCameraOutline } from "react-icons/io5";

const ProfileEdit = () => {
  const { userData, edit, setEdit } = useContext(UserData);
  const handelEdit = () => {
    setEdit(!edit);
  };

  // State hooks for inputs
  const [firstName, setFirstName] = useState(userData.data.FirstName || "");
  const [lastName, setLastName] = useState(userData.data.LastName || "");
  const [userName, setUserName] = useState(userData.data.UserName || "");
  const [headline, setHeadline] = useState(userData.data.headline || "");
  const [location, setLocation] = useState(userData.data.location || "");
  const [gender, setGender] = useState(userData.data.gender || "");
  const [skills, setSkills] = useState(userData.data.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState(userData.data.education || []);
  const [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });
  const [frontendProfileImage, setFrontendProfileImage] = useState(
    userData.data.ProfilePic || dp
  );
  const [backendProfileImage, setBackendProfileImage] = useState(null);
  const [frontendCoverImage, setFrontendCoverImage] = useState(
    userData.data.CoverPic
  );
  const [backendCoverImage, setBackendCoverImage] = useState(null);

  const profileImage = useRef();
  const coverImage = useRef();
  const [experience, setExperience] = useState(userData.data.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
    duration: "",
  });

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    }
  };

  const addEducation = (e) => {
    e.preventDefault();
    if (
      newEducation.college.trim() &&
      newEducation.degree.trim() &&
      newEducation.fieldOfStudy.trim()
    ) {
      setEducation([...education, newEducation]);
      setNewEducation({ college: "", degree: "", fieldOfStudy: "" });
    } else {
      alert("Please fill all education fields");
    }
  };
  const removeEducation = (edu) => {
    if (education.includes(edu)) {
      setEducation(education.filter((e) => e !== edu));
    }
  };

  const addExperience = (e) => {
    e.preventDefault();
    if (
      newExperience.title.trim() &&
      newExperience.company.trim() &&
      newExperience.description.trim() &&
      newExperience.duration.trim()
    ) {
      setExperience([...experience, newExperience]);
      setNewExperience({
        title: "",
        company: "",
        description: "",
        duration: "",
      });
    } else {
      alert("Please fill all experience fields");
    }
  };
  const removeExperience = (exp) => {
    if (experience.includes(exp)) {
      setExperience(experience.filter((e) => e !== exp));
    }
  };
  const handelProfileImage = (e) => {
    let file = e.target.files[0]
    setBackendProfileImage(file)
    setFrontendProfileImage(URL.createObjectURL(file))
   }
  const handelCoverImage = (e) => {
      let file = e.target.files[0];
      setBackendCoverImage(file);
      setFrontendCoverImage(URL.createObjectURL(file));
   }
  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={profileImage}
          onChange={handelProfileImage}
        />
        <input
          type="file"
          accept="image/*"
          hidden
          ref={coverImage}
          onChange={handelCoverImage}
        />
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Modal content */}
        <div className="relative w-[90%] max-w-[500px] max-h-[90vh] bg-white rounded-lg shadow-lg z-[200] flex flex-col px-3 overflow-auto">
          <div className="m-2 absolute left-2 top-2 text-gray-600 text-xl font-black p-1 rounded-lg hover:scale-105 cursor-pointer ">
            Edit Profile
          </div>
          <div
            className="m-2 absolute right-2 top-2 bg-red-600 text-white p-1 rounded-lg hover:scale-105 cursor-pointer"
            onClick={handelEdit}
          >
            <ImCross />
          </div>

          <div className="w-full h-[300px] bg-gray-500 rounded-lg mt-[50px] overflow-hidden px-3">
            <img src={frontendCoverImage} className="w-full" />
          </div>
          <div
            className="absolute top-15 right-5 bg-white bg-opacity-80 rounded-full p-1 text-black text-2xl cursor-pointer hover:bg-opacity-100 transition-shadow shadow-md z-50"
            onClick={() => coverImage.current.click()}
          >
            <IoCameraOutline />
          </div>
          <div className="absolute top-20 left-5 z-48 w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
            <img
              src={frontendProfileImage}
              alt="user profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute top-28 left-16 z-50 bg-[#06a2f0] p-1 rounded-full text-white text-sm lg:text-lg border-2 border-white shadow-md hover:bg-[#0480c0] transition transform translate-x-1/2 translate-y-1/2"
            onClick={() => profileImage.current.click()}
          >
            <FaPlus />
          </div>

          <div className="flex flex-col px-3 pb-6 mt-20 overflow-auto">
            <form className="flex flex-col gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
              />

              <input
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
              />
              <input
                type="text"
                placeholder="UserName"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
              />
              <input
                type="text"
                placeholder="HeadLine"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
              />
              <input
                type="text"
                placeholder="Location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
              />
              <select
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-[90%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699] text-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Skills Section */}
              <div className="w-[90%] border border-gray-300 rounded-md p-3 mt-4">
                <h2 className="font-semibold mb-2 text-gray-800">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#006699] text-white px-3 py-1 rounded-full text-sm inline-flex items-center gap-1"
                      >
                        {skill}
                        <span
                          className="cursor-pointer hover:text-gray-300"
                          onClick={() => removeSkill(skill)}
                        >
                          <RxCross2 />
                        </span>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet.</p>
                  )}
                </div>
                <div className="mt-4 flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <button
                    type="submit"
                    className="bg-[#006699] text-white px-4 py-2 rounded-md hover:bg-[#004466] transition"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Education Section */}
              <div className="w-[90%] border border-gray-300 rounded-md p-3 mt-4">
                <h2 className="font-semibold mb-2 text-gray-800">Education</h2>
                <div className="flex flex-wrap gap-2">
                  {education.length > 0 ? (
                    education.map((edu, index) => (
                      <span
                        key={index}
                        className="bg-[#006699] text-white px-3 py-1 rounded-lg text-sm inline-flex items-center gap-1"
                      >
                        <div>
                          <div>College: {edu.college}</div>
                          <div>Degree: {edu.degree}</div>
                          <div>Field: {edu.fieldOfStudy}</div>
                        </div>
                        <span
                          className="cursor-pointer hover:text-gray-300"
                          onClick={() => removeEducation(edu)}
                        >
                          <RxCross2 />
                        </span>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No Education added yet.</p>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="College"
                    value={newEducation.college}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        college: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        degree: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={newEducation.fieldOfStudy}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        fieldOfStudy: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <button
                    type="submit"
                    className="bg-[#006699] text-white px-4 py-2 rounded-md hover:bg-[#004466] transition"
                    onClick={addEducation}
                  >
                    Add Education
                  </button>
                </div>
              </div>
              {/* Experience Section */}
              <div className="w-[90%] border border-gray-300 rounded-md p-3 mt-4">
                <h2 className="font-semibold mb-2 text-gray-800">Experience</h2>
                <div className="flex flex-wrap gap-2">
                  {experience.length > 0 ? (
                    experience.map((exp, index) => (
                      <span
                        key={index}
                        className="bg-[#006699] text-white px-3 py-1 rounded-lg text-sm inline-flex items-center gap-1"
                      >
                        <div>
                          <div>Title: {exp.title}</div>
                          <div>Company: {exp.company}</div>
                          <div>Description: {exp.description}</div>
                          <div>Duration: {exp.duration}</div>
                        </div>

                        <span
                          className="cursor-pointer hover:text-gray-300"
                          onClick={() => removeExperience(exp)}
                        >
                          <RxCross2 />
                        </span>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No Experience added yet.</p>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newExperience.title}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        title: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={newExperience.company}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        company: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        description: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={newExperience.duration}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        duration: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006699]"
                  />
                  <button
                    type="submit"
                    className="bg-[#006699] text-white px-4 py-2 rounded-md hover:bg-[#004466] transition"
                    onClick={addExperience}
                  >
                    Add Experience
                  </button>
                </div>
              </div>
            </form>
            <button className="w-fit h-[40px] mt-2  flex items-center ml-70 bg-green-500 cursor-pointer rounded-lg border px-6 py-4 border-[#29d532] text-white hover:bg-[#1f8705] hover:text-white transition">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
