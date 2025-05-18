import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeVolunteer, selectVolunteer } from "lib/redux/resumeSlice";
import type { ResumeVolunteer } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";
import { ChangeEvent } from "react";

export const VolunteerForm = () => {
  const volunteer = useAppSelector(selectVolunteer);
  const dispatch = useAppDispatch();
  const showDelete = volunteer.length > 1;
  const form = "volunteer" as const;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleVolunteerChange = (
    idx: number,
    field: keyof ResumeVolunteer,
    value: string | string[]
  ) => {
    if (field === "descriptions") {
      dispatch(changeVolunteer({ idx, field, value: value as string[] }));
    } else {
      dispatch(changeVolunteer({ idx, field, value: value as string }));
    }
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      {volunteer.map((volunteerExp: ResumeVolunteer, idx: number) => (
        <FormSection
          key={idx}
          form={form}
          idx={idx}
          showDelete={showDelete}
          showMoveUp={idx !== 0}
          showMoveDown={idx !== volunteer.length - 1}
          deleteButtonTooltipText="Delete volunteer experience"
        >
          <div className="col-span-full grid grid-cols-6 gap-3">
            <Input
              label="Organization"
              labelClassName="col-span-full"
              name="organization"
              placeholder="Non-profit Organization"
              value={volunteerExp.organization}
              onChange={(name, value) => handleVolunteerChange(idx, name, value)}
            />
            <Input
              label="Role"
              labelClassName="col-span-full"
              name="role"
              placeholder="Volunteer Role"
              value={volunteerExp.role}
              onChange={(name, value) => handleVolunteerChange(idx, name, value)}
            />
            <Input
              label="Date"
              labelClassName="col-span-full"
              name="date"
              placeholder="Jan 2023 - Present"
              value={volunteerExp.date}
              onChange={(name, value) => handleVolunteerChange(idx, name, value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={volunteerExp.descriptions}
                onChange={(name, value) => handleVolunteerChange(idx, name, value)}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[7.7rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </div>
        </FormSection>
      ))}
    </Form>
  );
}; 