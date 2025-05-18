import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeAwards, selectAwards } from "lib/redux/resumeSlice";
import type { ResumeAward } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";

export const AwardsForm = () => {
  const awards = useAppSelector(selectAwards);
  const dispatch = useAppDispatch();
  const showDelete = awards.length > 1;
  const form = "awards" as const;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleAwardChange = (
    idx: number,
    field: keyof ResumeAward,
    value: string | string[]
  ) => {
    if (field === "descriptions") {
      dispatch(changeAwards({ idx, field, value: value as string[] }));
    } else {
      dispatch(changeAwards({ idx, field, value: value as string }));
    }
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      {awards.map((award, idx) => (
        <FormSection
          key={idx}
          form={form}
          idx={idx}
          showDelete={showDelete}
          showMoveUp={idx !== 0}
          showMoveDown={idx !== awards.length - 1}
          deleteButtonTooltipText="Delete award"
        >
          <div className="col-span-full grid grid-cols-6 gap-3">
            <Input
              label="Title"
              labelClassName="col-span-full"
              name="title"
              placeholder="Employee of the Year"
              value={award.title}
              onChange={(name, value) => handleAwardChange(idx, name, value)}
            />
            <Input
              label="Issuing Organization"
              labelClassName="col-span-full"
              name="issuer"
              placeholder="Company/Organization Name"
              value={award.issuer}
              onChange={(name, value) => handleAwardChange(idx, name, value)}
            />
            <Input
              label="Date"
              labelClassName="col-span-full"
              name="date"
              placeholder="Jan 2023"
              value={award.date}
              onChange={(name, value) => handleAwardChange(idx, name, value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={award.descriptions}
                onChange={(name, value) => handleAwardChange(idx, name, value)}
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