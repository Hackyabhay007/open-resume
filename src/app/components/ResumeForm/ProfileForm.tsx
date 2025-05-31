import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location, linkedin, github, twitter } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        
        {/* Contact Information - Responsive for mobile */}
        <Input
          label="Email"
          labelClassName="col-span-6 sm:col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-6 sm:col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-6 sm:col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
        
        {/* Social Media Section */}
        <div className="col-span-full mt-2 mb-1">
          <h3 className="text-sm font-medium text-gray-700">Social Media</h3>
        </div>
        
        <Input
          label="Website"
          labelClassName="col-span-6 sm:col-span-3"
          name="url"
          placeholder="yourwebsite.com"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="LinkedIn"
          labelClassName="col-span-6 sm:col-span-3"
          name="linkedin"
          placeholder="linkedin.com/in/username"
          value={linkedin || ''}
          onChange={handleProfileChange}
        />
        <Input
          label="GitHub"
          labelClassName="col-span-6 sm:col-span-3"
          name="github"
          placeholder="github.com/username"
          value={github || ''}
          onChange={handleProfileChange}
        />
        <Input
          label="Twitter"
          labelClassName="col-span-6 sm:col-span-3"
          name="twitter"
          placeholder="twitter.com/username"
          value={twitter || ''}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
