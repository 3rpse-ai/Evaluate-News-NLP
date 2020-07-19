import { updateOutputField } from '../client/js/formHandler'

describe("Testing the UI update functionality", () => {
    test("Testing the updateOutputField() function", () => {
        const input = {
            autocompletes: [
                { id: '11524', text: 'Congressional Testimony' },
                { id: '8389', text: 'Testosterone Pit' },
                { id: '1856', text: "America's Test Kitchen" },
              ]
        }
        const output = "Congressional Testimony</br>Testosterone Pit</br>America's Test Kitchen</br>"
        expect(updateOutputField(input)).toEqual(output);
    })
})
