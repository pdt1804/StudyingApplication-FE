//AuthScreens
import { user_login } from "./AuthScreens/user_login";
import {
  user_register,
  user_createAccountData,
} from "./AuthScreens/user_register";
import {
  auth_getRecoveryCode,
  auth_getAuthOTP,
  auth_changePasswordAfterOTP,
} from "./AuthScreens/user_recoveringPassword";

//UserProfileScreens
import {
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
} from "./UserProfileScreens/user_profile";
import { user_profile_changePassword } from "./UserProfileScreens/user_changePassword";

//NotificationScreens
import {
  notifications_getAllByUserName,
  notifications_checkNewByNotifycationID,
} from "./NotificationScreens/notifications_getAll";
import {
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
} from "./NotificationScreens/notifications_loadAndShow";

//GroupChatScreens
import {
  group_findGroupById,
  group_createGroup,
  group_extractBearerToken,
} from "./GroupChatScreens/group_general_management";
import {
  group_getAllSubject,
  group_createNewSubject,
  group_getNumberOfBlogBySubject,
} from "./GroupChatScreens/group_subTab_subject";
import { group_getAllNotificationByGroupId } from "./GroupChatScreens/group_subTab_notification";
import {
  group_getAllDocumentOfGroup,
  group_addDocument,
} from "./GroupChatScreens/group_subTab_document";
import { group_getAllBlog } from "./GroupChatScreens/group_subTab_discussion_blog";
import {
  group_getAllGroupofUser,
  group_checkNewMessage,
} from "./GroupChatScreens/group_tab_yourGroups";
import { group_findGroupbyName } from "./GroupChatScreens/group_tab_suggestions";

//FriendsListScreens
import {
  friend_getAllFriendList,
  friend_checkNewMessage,
} from "./FriendsListScreens/friend_tab_yourFriends";
import {
  friend_findAllFriendByInputName,
  friend_getAllSentInvitationList,
  friend_getAllInvitationFriendList,
  friend_addFriend,
  friend_undoInvitationFriend,
  friend_acceptInvitation,
  friend_refuseInvitation,
} from "./FriendsListScreens/friend_tab_requestAndSuggestion";

//MessengerScreens
import {
  messenger_getFriendID,
  messenger_loadMessageforUser,
  messenger_loadMessageInGroup,
  messenger_receiveMessage,
  messenger_sendMessageForGroup,
} from "./MessengerScreens/messenger_userAndFriend";

//
//
//
//New style
import {
  blog_getAllSubject,
  blog_getAllBlog,
  blog_getAllBlogByContent,
  blog_insertImageInBlog,
  blog_getBlogById,
  blog_getAllBlogBySubject,
  blog_getAllCommentInBlog,
  blog_getAllReplyInComment,
  blog_createNewSubject,
  blog_updateSubject,
  blog_deleteSubject,
  blog_getNumberOfBlogBySubject,
  blog_checkLikeBlog,
  blog_likeBlog,
  blog_createNewBlog,
  blog_insertImage,
  blog_reSendNotificationForBlog,
  blog_sureToDeleteSubject,
  blog_commentBlog,
  blog_updateComment,
  blog_deleteComment,
  blog_replyComment,
  blog_updateReply,
  blog_deleteReply,
  blog_insertImageInComment,
  blog_insertImageInReply,
} from "./ReNewStyle/blogController";
import {
  document_getAllDocumentOfGroup,
  document_getDocumentById,
  document_addDocument,
  document_deleteDocument,
} from "./ReNewStyle/documentController";
import {
  friendship_getAllFriendList,
  friendship_getAllSentInvitationList,
  friendship_getAllInvitationFriendList,
  friendship_refuseInvitation,
  friendship_acceptInvitation,
  friendship_addFriend,
  friendship_undoInvitationFriend,
  friendship_deleteFriend,
  friendship_checkNewMessage,
  friendship_findAllFriendByInputName,
  friendship_findAllFriendByUserName,
} from "./ReNewStyle/friendShipController";
import {
  groupStudying_getAllGroupofUser,
  groupStudying_checkNewMessage,
  groupStudying_findGroupbyId,
  groupStudying_getGroupByDocumentID,
  groupStudying_findGroupbyName,
  groupStudying_createGroup,
  groupStudying_deleteGroup,
  groupStudying_getUserAddInGroup,
  groupStudying_getNameGroupByNotificationID,
  groupStudying_updateGroup,
  groupStudying_updateTopics,
  groupStudying_deleteUser,
  groupStudying_changeAvatarGroup,
  groupStudying_changeLeaderofGroup,
  groupStudying_joinInGroup,
  groupStudying_addFriendInGroup,
  groupStudying_getAllUserInGroup,
  groupStudying_getAllGroupByTopics,
  groupStudying_getAllRecommendedGroup,
} from "./ReNewStyle/groupStudyingController";
import {
  information_getAllFavoriteTopics,
  information_getAllTopics,
  information_getAllUnfavourateTopics,
  information_updateInformation,
  information_initialize,
  information_AddTopic,
  information_RemoveTopic,
  information_getInformation,
  information_getAvatar,
  information_changePassword,
  information_changeAvatar,
  information_changeAvatarCloud,
  information_ExtractBearerToken,
  information_GetUser,
  information_getAllUpside,
  information_getAllDownside,
} from "./ReNewStyle/informationController";
import {
  messagegroup_sendMessage,
  messagegroup_loadMessageInGroup,
  messagegroup_getSentUserInGroup,
  messagegroup_uploadImage,
} from "./ReNewStyle/messageGroupController";
import {
  messageuser_loadMessageforUser,
  messageuser_getFriendID,
  messageuser_getSentUser,
  messageuser_checkSender,
  messageuser_sendMessageForUser,
  messageuser_uploadImage,
  messageuser_uploadMultipleImages,
  messageuser_saveChatbotMessage,
} from "./ReNewStyle/messageUserController";
import {
  notification_createNotification,
  notification_insertImage,
  notification_getAllByGroupID,
  notification_getAllByUserName,
  notification_checkNewNotification,
  notification_loadNotification,
  notification_deleteForAllMembers,
  notification_deleteForMyAccount,
} from "./ReNewStyle/notifycationController";
import {
  review_checkUserReview,
  review_getAllReviewOfGroup,
  review_createReview,
  review_updateReview,
  review_deleteReview,
} from "./ReNewStyle/reviewController";
import {
  user_checkUserName,
  user_checkEmail,
  user_authenticate,
  user_createAccount,
  user_changePasswordAfterOTP,
  user_getRecoveryCode,
  user_getUser,
  user_getAuthenticationCode,
} from "./ReNewStyle/userController";

export {
  user_login,
  //
  user_register,
  user_createAccountData,
  //
  auth_getRecoveryCode,
  auth_getAuthOTP,
  auth_changePasswordAfterOTP,
  //
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
  //
  user_profile_changePassword,
  //
  notifications_getAllByUserName,
  notifications_checkNewByNotifycationID,
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
  //
  group_findGroupById,
  group_createGroup,
  group_getAllSubject,
  group_extractBearerToken,
  group_createNewSubject,
  group_getNumberOfBlogBySubject,
  group_getAllNotificationByGroupId,
  group_getAllDocumentOfGroup,
  group_addDocument,
  group_getAllBlog,
  group_getAllGroupofUser,
  group_checkNewMessage,
  group_findGroupbyName,
  //
  friend_getAllFriendList,
  friend_checkNewMessage,
  friend_findAllFriendByInputName,
  friend_getAllSentInvitationList,
  friend_getAllInvitationFriendList,
  friend_addFriend,
  friend_undoInvitationFriend,
  friend_acceptInvitation,
  friend_refuseInvitation,
  //
  messenger_getFriendID,
  messenger_loadMessageforUser,
  messenger_loadMessageInGroup,
  messenger_receiveMessage,
  messenger_sendMessageForGroup,
  //
  //
  //
  //New styleblog_getAllSubject,
  blog_getAllBlog,
  blog_getAllBlogByContent,
  blog_insertImageInBlog,
  blog_getBlogById,
  blog_getAllBlogBySubject,
  blog_getAllCommentInBlog,
  blog_getAllReplyInComment,
  blog_createNewSubject,
  blog_updateSubject,
  blog_deleteSubject,
  blog_getNumberOfBlogBySubject,
  blog_checkLikeBlog,
  blog_likeBlog,
  blog_createNewBlog,
  blog_insertImage,
  blog_reSendNotificationForBlog,
  blog_sureToDeleteSubject,
  blog_commentBlog,
  blog_updateComment,
  blog_deleteComment,
  blog_replyComment,
  blog_updateReply,
  blog_deleteReply,
  blog_insertImageInComment,
  blog_insertImageInReply,
  document_getAllDocumentOfGroup,
  document_getDocumentById,
  document_addDocument,
  document_deleteDocument,
  friendship_getAllFriendList,
  friendship_getAllSentInvitationList,
  friendship_getAllInvitationFriendList,
  friendship_refuseInvitation,
  friendship_acceptInvitation,
  friendship_addFriend,
  friendship_undoInvitationFriend,
  friendship_deleteFriend,
  friendship_checkNewMessage,
  friendship_findAllFriendByInputName,
  friendship_findAllFriendByUserName,
  groupStudying_getAllGroupofUser,
  groupStudying_checkNewMessage,
  groupStudying_findGroupbyId,
  groupStudying_getGroupByDocumentID,
  groupStudying_findGroupbyName,
  groupStudying_createGroup,
  groupStudying_deleteGroup,
  groupStudying_getUserAddInGroup,
  groupStudying_getNameGroupByNotificationID,
  groupStudying_updateGroup,
  groupStudying_updateTopics,
  groupStudying_deleteUser,
  groupStudying_changeAvatarGroup,
  groupStudying_changeLeaderofGroup,
  groupStudying_joinInGroup,
  groupStudying_addFriendInGroup,
  groupStudying_getAllUserInGroup,
  groupStudying_getAllGroupByTopics,
  groupStudying_getAllRecommendedGroup,
  information_getAllFavoriteTopics,
  information_getAllTopics,
  information_getAllUnfavourateTopics,
  information_updateInformation,
  information_initialize,
  information_AddTopic,
  information_RemoveTopic,
  information_getInformation,
  information_getAvatar,
  information_changePassword,
  information_changeAvatar,
  information_changeAvatarCloud,
  information_ExtractBearerToken,
  information_GetUser,
  information_getAllUpside,
  information_getAllDownside,
  messagegroup_sendMessage,
  messagegroup_loadMessageInGroup,
  messagegroup_getSentUserInGroup,
  messagegroup_uploadImage,
  messageuser_loadMessageforUser,
  messageuser_getFriendID,
  messageuser_getSentUser,
  messageuser_checkSender,
  messageuser_sendMessageForUser,
  messageuser_uploadImage,
  messageuser_uploadMultipleImages,
  messageuser_saveChatbotMessage,
  notification_createNotification,
  notification_insertImage,
  notification_getAllByGroupID,
  notification_getAllByUserName,
  notification_checkNewNotification,
  notification_loadNotification,
  notification_deleteForAllMembers,
  notification_deleteForMyAccount,
  review_checkUserReview,
  review_getAllReviewOfGroup,
  review_createReview,
  review_updateReview,
  review_deleteReview,
  user_checkUserName,
  user_checkEmail,
  user_authenticate,
  user_createAccount,
  user_changePasswordAfterOTP,
  user_getRecoveryCode,
  user_getUser,
  user_getAuthenticationCode,
};
