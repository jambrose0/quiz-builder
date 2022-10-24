import { gql } from '@apollo/client'

export const QUERY_QUIZZES = gql`
query quizzes($username: String) {
quizzes(username: $username) {
        
_id
quizText
createdAt
username
questionCount
questions {
_id
createdAt
username
questionBody
}
}
}
`;

