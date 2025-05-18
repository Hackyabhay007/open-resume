import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeLanguages, selectLanguages } from "lib/redux/resumeSlice";
import type { ResumeLanguage } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";

export const LanguagesForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const showDelete = languages.length > 1;
  const form = "languages" as const;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleLanguageChange = (
    idx: number,
    field: keyof ResumeLanguage,
    value: string | string[]
  ) => {
    if (field === "descriptions") {
      dispatch(changeLanguages({ idx, field, value: value as string[] }));
    } else {
      dispatch(changeLanguages({ idx, field, value: value as string }));
    }
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      {languages.map((language, idx) => (
        <FormSection
          key={idx}
          form={form}
          idx={idx}
          showDelete={showDelete}
          showMoveUp={idx !== 0}
          showMoveDown={idx !== languages.length - 1}
          deleteButtonTooltipText="Delete language"
        >
          <div className="col-span-full grid grid-cols-6 gap-3">
            <Input
              label="Language"
              labelClassName="col-span-full"
              name="language"
              placeholder="Spanish"
              value={language.language}
              onChange={(name, value) => handleLanguageChange(idx, name, value)}
            />
            <Input
              label="Proficiency"
              labelClassName="col-span-full"
              name="proficiency"
              placeholder="Native/Fluent/Advanced/Intermediate/Basic"
              value={language.proficiency}
              onChange={(name, value) => handleLanguageChange(idx, name, value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={language.descriptions}
                onChange={(name, value) => handleLanguageChange(idx, name, value)}
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