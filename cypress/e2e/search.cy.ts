// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cypress from "cypress"

describe('Search', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('should have actionnable buttons when search has results', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        cy.get('._loader_vo7ua_1')
        cy.wait('@successSearch')

        const actionButtons = cy.get('._actionbarContainer_1v48u_1 button')

        actionButtons.last().click()

        actionButtons.should('exist');
        actionButtons.each((e: JQuery<HTMLButtonElement>, i) => {
            if (i <= 2) {
                cy.wrap(e).should(i === 0 ? 'not.have.attr' : 'have.attr', 'disabled')
            }
        })
    })

    it('should display message when no results', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/no-results-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        cy.get('._loader_vo7ua_1')
        cy.wait('@successSearch')
        const listItem = cy.get('._profileListItemContainer_ss6gy_1')
        listItem.should('not.exist')
        cy.get('.no-result-message').should('be.visible')
    })

    it('should display error message when api rate limit', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/no-results-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500,
            statusCode: 403,
            headers: {
                "x-ratelimit-remaining": "0"
            }
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        cy.get('._loader_vo7ua_1')
        cy.wait('@successSearch')
        cy.get('._profileListItemContainer_ss6gy_1').should('not.exist')

        cy.get('._error_62oy0_27').should('have.text', 'Max request reached')
    })

    it('should display checkbox on list item card when edit mode is active', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        const editModeButton = cy.get('.edit-mode')
        editModeButton.should('be.visible')
        editModeButton.click()

        const cards = cy.get('._profileListItemContainer_ss6gy_1')

        cards.each((card) => {
            const checkbox = cy.wrap(card).get('input[type="checkbox"]')
            checkbox.should('be.visible')
            checkbox.should('not.be.checked')
        })
    })

    it('should display select all action when edit mode is active', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        const editModeButton = cy.get('.edit-mode')
        editModeButton.should('be.visible')
        editModeButton.click()

        const selectAllAction = cy.get("._actionbarContainer_1v48u_1 button").first()
        selectAllAction.should('be.visible')
    })

    it('should hide card checkboxes when edit mode is disabled', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        const editModeButton = cy.get('.edit-mode')
        editModeButton.should('be.visible')

        const cards = cy.get('._profileListItemContainer_ss6gy_1')

        cards.each((card) => {
            const checkbox = cy.wrap(card).get('input[type="checkbox"]')
            checkbox.should('not.exist')
        })
    })

    it('should hide duplicate and delete actions when edit mode is disabled', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        const editModeButton = cy.get('.edit-mode')
        editModeButton.should('be.visible')

        const actionButtons = cy.get('._actionbarContainer_1v48u_1 button')

        actionButtons.each((actionButton, i) => {
            if ([1, 2].includes(i)) {
                cy.wrap(actionButton).should('not.exist')
            }
        })
    })

    it('should not display results on init', () => {
        const input = cy.get('input._searchInput_1nt7h_1')
        input.should('have.value', '')

        cy.get('._profileListItemContainer_ss6gy_1').should('not.exist')

        cy.get('._loader_vo7ua_1').should('not.exist')
        cy.get('._error_62oy0_27').should('not.exist')
    })

    it('should not have action visible on init', () => {
        cy.get('._container_14l5l_1 > button').should('not.exist')
    })

    it('should display results when search', () => {
        cy.intercept('GET', '**/search/*', {
            fixture: 'profiles/success-search.json',
            // Required , otherwise query is processed to fast and spinner not shown
            delay: 500
        }).as('successSearch')

        cy.get('input._searchInput_1nt7h_1')
            .type('dummy-test')

        cy.get('._loader_vo7ua_1')
        cy.wait('@successSearch')

        cy.get('._profileListItemContainer_ss6gy_1').should('have.length', 3)
    })
})

